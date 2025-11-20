import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import MigrationRecord from './MigrationRecord.js';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

/**
 * Migration Manager
 * 
 * Handles execution, rollback, and tracking of database migrations
 */
class MigrationManager {
  constructor() {
    this.migrationsPath = path.join(__dirname, 'versions');
    this.isConnected = false;
  }

  /**
   * Connect to MongoDB
   */
  async connect() {
    if (this.isConnected) return;

    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('📋 Connected to MongoDB for migrations');
      this.isConnected = true;
    } catch (error) {
      console.error('❌ Failed to connect to MongoDB:', error.message);
      throw error;
    }
  }

  /**
   * Disconnect from MongoDB
   */
  async disconnect() {
    if (this.isConnected) {
      await mongoose.disconnect();
      console.log('📋 Disconnected from MongoDB');
      this.isConnected = false;
    }
  }

  /**
   * Get all available migration files
   */
  async getAvailableMigrations() {
    try {
      if (!fs.existsSync(this.migrationsPath)) {
        fs.mkdirSync(this.migrationsPath, { recursive: true });
        return [];
      }

      const files = fs.readdirSync(this.migrationsPath)
        .filter(file => file.endsWith('.js'))
        .sort();

      const migrations = [];
      
      for (const file of files) {
        try {
          // Fix Windows path issue for ES modules
          const migrationPath = path.join(this.migrationsPath, file);
          const migrationUrl = `file://${migrationPath.replace(/\\/g, '/')}`;
          const MigrationClass = (await import(migrationUrl)).default;
          const version = file.replace('.js', '');
          const migration = new MigrationClass(version);
          
          migrations.push({
            version,
            file,
            migration,
            description: migration.description()
          });
        } catch (error) {
          console.warn(`⚠️  Failed to load migration ${file}:`, error.message);
        }
      }

      return migrations;
    } catch (error) {
      console.error('❌ Error getting available migrations:', error);
      throw error;
    }
  }

  /**
   * Get executed migrations
   */
  async getExecutedMigrations() {
    try {
      return await MigrationRecord.find({}, { version: 1, status: 1 }).sort({ version: 1 });
    } catch (error) {
      console.error('❌ Error getting executed migrations:', error);
      throw error;
    }
  }

  /**
   * Get pending migrations
   */
  async getPendingMigrations() {
    const available = await this.getAvailableMigrations();
    const executed = await this.getExecutedMigrations();
    const executedVersions = new Set(
      executed.filter(m => m.status === 'completed').map(m => m.version)
    );

    return available.filter(migration => !executedVersions.has(migration.version));
  }

  /**
   * Execute a single migration
   */
  async executeMigration(migrationInfo) {
    const { version, migration, description } = migrationInfo;
    const startTime = Date.now();

    console.log(`\n🚀 Executing migration: ${version}`);
    console.log(`   Description: ${description}`);

    try {
      await migration.up();
      
      const executionTime = Date.now() - startTime;
      
      // Record successful migration
      await MigrationRecord.create({
        version,
        name: version,
        description,
        executionTime,
        status: 'completed'
      });

      console.log(`✅ Migration ${version} completed successfully (${executionTime}ms)`);
      return { success: true, executionTime };

    } catch (error) {
      const executionTime = Date.now() - startTime;
      
      console.error(`❌ Migration ${version} failed:`, error.message);
      
      // Record failed migration
      try {
        await MigrationRecord.create({
          version,
          name: version,
          description,
          executionTime,
          status: 'failed',
          error: error.message
        });
      } catch (recordError) {
        console.error('❌ Failed to record migration failure:', recordError.message);
      }

      throw error;
    }
  }

  /**
   * Rollback a single migration
   */
  async rollbackMigration(migrationInfo) {
    const { version, migration, description } = migrationInfo;
    
    console.log(`\n🔄 Rolling back migration: ${version}`);
    console.log(`   Description: ${description}`);

    try {
      await migration.down();

      // Update migration record
      await MigrationRecord.findOneAndUpdate(
        { version },
        { 
          status: 'rolled_back',
          executedAt: new Date()
        }
      );

      console.log(`✅ Migration ${version} rolled back successfully`);
      return { success: true };

    } catch (error) {
      console.error(`❌ Rollback of ${version} failed:`, error.message);
      throw error;
    }
  }

  /**
   * Run all pending migrations
   */
  async runMigrations(options = {}) {
    const { dryRun = false, target = null } = options;

    try {
      await this.connect();

      const pending = await this.getPendingMigrations();
      
      if (pending.length === 0) {
        console.log('✅ No pending migrations found');
        return { success: true, executed: [] };
      }

      // Filter migrations if target is specified
      const toExecute = target 
        ? pending.filter(m => m.version <= target)
        : pending;

      if (dryRun) {
        console.log('\n🔍 DRY RUN - Migrations that would be executed:');
        toExecute.forEach(migration => {
          console.log(`   ${migration.version}: ${migration.description}`);
        });
        return { success: true, executed: [], dryRun: true };
      }

      console.log(`\n📦 Found ${toExecute.length} pending migration(s)`);
      
      const executed = [];
      for (const migrationInfo of toExecute) {
        const result = await this.executeMigration(migrationInfo);
        executed.push({
          version: migrationInfo.version,
          description: migrationInfo.description,
          ...result
        });
      }

      console.log(`\n🎉 Successfully executed ${executed.length} migration(s)`);
      return { success: true, executed };

    } catch (error) {
      console.error('\n❌ Migration execution failed:', error.message);
      throw error;
    } finally {
      await this.disconnect();
    }
  }

  /**
   * Rollback migrations
   */
  async rollbackMigrations(options = {}) {
    const { target = null, steps = 1 } = options;

    try {
      await this.connect();

      const executed = await MigrationRecord
        .find({ status: 'completed' })
        .sort({ version: -1 });

      if (executed.length === 0) {
        console.log('✅ No migrations to rollback');
        return { success: true, rolledBack: [] };
      }

      // Determine which migrations to rollback
      let toRollback;
      if (target) {
        toRollback = executed.filter(m => m.version > target);
      } else {
        toRollback = executed.slice(0, steps);
      }

      if (toRollback.length === 0) {
        console.log('✅ No migrations match rollback criteria');
        return { success: true, rolledBack: [] };
      }

      // Load migration classes and rollback
      const available = await this.getAvailableMigrations();
      const rolledBack = [];

      for (const record of toRollback) {
        const migrationInfo = available.find(m => m.version === record.version);
        if (migrationInfo) {
          await this.rollbackMigration(migrationInfo);
          rolledBack.push({
            version: record.version,
            description: record.description
          });
        } else {
          console.warn(`⚠️  Migration file not found for ${record.version}`);
        }
      }

      console.log(`\n🎉 Successfully rolled back ${rolledBack.length} migration(s)`);
      return { success: true, rolledBack };

    } catch (error) {
      console.error('\n❌ Migration rollback failed:', error.message);
      throw error;
    } finally {
      await this.disconnect();
    }
  }

  /**
   * Get migration status
   */
  async getStatus() {
    try {
      await this.connect();

      const available = await this.getAvailableMigrations();
      const executed = await this.getExecutedMigrations();
      const pending = await this.getPendingMigrations();

      console.log('\n📊 Migration Status:');
      console.log('==================');
      console.log(`Available migrations: ${available.length}`);
      console.log(`Executed migrations:  ${executed.filter(m => m.status === 'completed').length}`);
      console.log(`Failed migrations:    ${executed.filter(m => m.status === 'failed').length}`);
      console.log(`Pending migrations:   ${pending.length}`);

      if (pending.length > 0) {
        console.log('\n📋 Pending Migrations:');
        pending.forEach(migration => {
          console.log(`   ${migration.version}: ${migration.description}`);
        });
      }

      if (executed.length > 0) {
        console.log('\n📋 Executed Migrations:');
        executed.forEach(record => {
          const status = record.status === 'completed' ? '✅' : 
                        record.status === 'failed' ? '❌' : '🔄';
          console.log(`   ${status} ${record.version}`);
        });
      }

      return {
        available: available.length,
        executed: executed.filter(m => m.status === 'completed').length,
        failed: executed.filter(m => m.status === 'failed').length,
        pending: pending.length,
        pendingList: pending,
        executedList: executed
      };

    } catch (error) {
      console.error('❌ Error getting migration status:', error.message);
      throw error;
    } finally {
      await this.disconnect();
    }
  }

  /**
   * Create a new migration file
   */
  async createMigration(name) {
    if (!name) {
      throw new Error('Migration name is required');
    }

    // Create version timestamp
    const timestamp = new Date().toISOString()
      .replace(/[-:]/g, '')
      .replace(/\..+/, '');
    
    const version = `${timestamp}_${name.replace(/\s+/g, '_').toLowerCase()}`;
    const filename = `${version}.js`;
    const filepath = path.join(this.migrationsPath, filename);

    // Ensure migrations directory exists
    if (!fs.existsSync(this.migrationsPath)) {
      fs.mkdirSync(this.migrationsPath, { recursive: true });
    }

    const template = `import { Migration } from '../Migration.js';

/**
 * Migration: ${name}
 * Created: ${new Date().toISOString()}
 */
class ${name.replace(/\s+/g, '')}Migration extends Migration {
  /**
   * Apply the migration
   */
  async up() {
    console.log('Applying migration: ${name}');
    
    // TODO: Implement migration logic here
    // Examples:
    
    // Create index
    // await this.createIndex('users', { email: 1 }, { unique: true });
    
    // Add field with default value
    // await this.addField('users', 'isVerified', false);
    
    // Transform data
    // await this.transformData('users', (doc) => {
    //   doc.fullName = \`\${doc.firstName} \${doc.lastName}\`;
    //   return doc;
    // });
    
    throw new Error('Migration not implemented yet');
  }

  /**
   * Rollback the migration
   */
  async down() {
    console.log('Rolling back migration: ${name}');
    
    // TODO: Implement rollback logic here
    // Examples:
    
    // Drop index
    // await this.dropIndex('users', 'email_1');
    
    // Remove field
    // await this.removeField('users', 'isVerified');
    
    throw new Error('Migration rollback not implemented yet');
  }

  /**
   * Migration description
   */
  description() {
    return '${name}';
  }
}

export default ${name.replace(/\s+/g, '')}Migration;
`;

    try {
      fs.writeFileSync(filepath, template);
      console.log(`✅ Created migration file: ${filename}`);
      console.log(`📁 Location: ${filepath}`);
      console.log('\n📝 Next steps:');
      console.log('1. Edit the migration file to implement up() and down() methods');
      console.log('2. Run: npm run migrate to execute pending migrations');
      
      return { filename, filepath, version };
    } catch (error) {
      console.error('❌ Failed to create migration file:', error.message);
      throw error;
    }
  }
}

export default MigrationManager;