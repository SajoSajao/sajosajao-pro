#!/usr/bin/env node

import { program } from 'commander';
import MigrationManager from '../migrations/MigrationManager.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const migrationManager = new MigrationManager();

// Migration CLI Commands
program
  .name('migrate')
  .description('Database migration management tool')
  .version('1.0.0');

// Run migrations
program
  .command('up')
  .description('Run pending migrations')
  .option('-d, --dry-run', 'Show what migrations would be executed without running them')
  .option('-t, --target <version>', 'Run migrations up to specific version')
  .action(async (options) => {
    try {
      console.log('🚀 Running database migrations...\n');
      
      const result = await migrationManager.runMigrations({
        dryRun: options.dryRun,
        target: options.target
      });

      if (result.dryRun) {
        console.log('\n✅ Dry run completed successfully');
      } else if (result.executed.length > 0) {
        console.log(`\n✅ Successfully executed ${result.executed.length} migration(s)`);
      } else {
        console.log('\n✅ All migrations are up to date');
      }

      process.exit(0);
    } catch (error) {
      console.error('\n❌ Migration failed:', error.message);
      process.exit(1);
    }
  });

// Rollback migrations
program
  .command('down')
  .description('Rollback migrations')
  .option('-t, --target <version>', 'Rollback to specific version')
  .option('-s, --steps <number>', 'Number of migrations to rollback', '1')
  .action(async (options) => {
    try {
      console.log('🔄 Rolling back database migrations...\n');
      
      const result = await migrationManager.rollbackMigrations({
        target: options.target,
        steps: parseInt(options.steps, 10)
      });

      if (result.rolledBack.length > 0) {
        console.log(`\n✅ Successfully rolled back ${result.rolledBack.length} migration(s)`);
      } else {
        console.log('\n✅ No migrations to rollback');
      }

      process.exit(0);
    } catch (error) {
      console.error('\n❌ Rollback failed:', error.message);
      process.exit(1);
    }
  });

// Migration status
program
  .command('status')
  .description('Show migration status')
  .action(async () => {
    try {
      await migrationManager.getStatus();
      process.exit(0);
    } catch (error) {
      console.error('\n❌ Failed to get status:', error.message);
      process.exit(1);
    }
  });

// Create new migration
program
  .command('create <name>')
  .description('Create a new migration file')
  .action(async (name) => {
    try {
      console.log(`📝 Creating new migration: ${name}\n`);
      
      const result = await migrationManager.createMigration(name);
      
      console.log(`\n✅ Migration created successfully`);
      console.log(`📁 File: ${result.filename}`);
      
      process.exit(0);
    } catch (error) {
      console.error('\n❌ Failed to create migration:', error.message);
      process.exit(1);
    }
  });

// Reset database (danger zone)
program
  .command('reset')
  .description('⚠️  DANGER: Reset database by rolling back all migrations')
  .option('--force', 'Force reset without confirmation')
  .action(async (options) => {
    try {
      if (!options.force) {
        console.log('\n⚠️  WARNING: This will rollback ALL migrations!');
        console.log('This action cannot be undone.');
        console.log('Use --force flag to confirm this action.');
        process.exit(1);
      }

      console.log('🔄 Resetting database (rolling back all migrations)...\n');
      
      await migrationManager.connect();
      const executed = await migrationManager.getExecutedMigrations();
      
      if (executed.length === 0) {
        console.log('✅ Database is already clean (no migrations to rollback)');
        process.exit(0);
      }

      // Rollback all migrations
      const result = await migrationManager.rollbackMigrations({
        steps: executed.length
      });

      console.log(`\n✅ Database reset completed (${result.rolledBack.length} migrations rolled back)`);
      process.exit(0);
    } catch (error) {
      console.error('\n❌ Database reset failed:', error.message);
      process.exit(1);
    }
  });

// Fresh migration (reset + migrate)
program
  .command('fresh')
  .description('⚠️  DANGER: Reset database and run all migrations from scratch')
  .option('--force', 'Force fresh migration without confirmation')
  .action(async (options) => {
    try {
      if (!options.force) {
        console.log('\n⚠️  WARNING: This will reset the database and run all migrations from scratch!');
        console.log('All data will be lost.');
        console.log('Use --force flag to confirm this action.');
        process.exit(1);
      }

      console.log('🔄 Running fresh migration (reset + migrate)...\n');
      
      // Reset database
      await migrationManager.connect();
      const executed = await migrationManager.getExecutedMigrations();
      
      if (executed.length > 0) {
        console.log('1️⃣ Resetting database...');
        await migrationManager.rollbackMigrations({
          steps: executed.length
        });
      }
      
      await migrationManager.disconnect();

      // Run all migrations
      console.log('\n2️⃣ Running all migrations...');
      const result = await migrationManager.runMigrations();

      console.log(`\n✅ Fresh migration completed (${result.executed.length} migrations executed)`);
      process.exit(0);
    } catch (error) {
      console.error('\n❌ Fresh migration failed:', error.message);
      process.exit(1);
    }
  });

// Parse command line arguments
program.parse();

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}