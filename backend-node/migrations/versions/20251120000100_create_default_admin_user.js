import { Migration } from '../Migration.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

/**
 * Migration: Create Default Admin User
 * Created: 2025-11-20T00:01:00.000Z
 */
class CreateDefaultAdminUserMigration extends Migration {
  /**
   * Apply the migration
   */
  async up() {
    console.log('Applying migration: Create Default Admin User');
    
    // Check if any admin user already exists
    const existingAdmin = await mongoose.connection.db.collection('users')
      .findOne({ role: 'admin' });
    
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists, skipping creation');
      return;
    }

    // Create default admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const adminUser = {
      userid: 'admin',
      password: hashedPassword,
      role: 'admin',
      status: 'active',
      lastLogin: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await mongoose.connection.db.collection('users').insertOne(adminUser);
    
    console.log('✅ Default admin user created');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('   ⚠️  IMPORTANT: Change password after first login!');
  }

  /**
   * Rollback the migration
   */
  async down() {
    console.log('Rolling back migration: Create Default Admin User');
    
    // Remove the default admin user
    const result = await mongoose.connection.db.collection('users')
      .deleteOne({ userid: 'admin' });
    
    if (result.deletedCount > 0) {
      console.log('✅ Default admin user removed');
    } else {
      console.log('ℹ️  Default admin user not found');
    }
  }

  /**
   * Migration description
   */
  description() {
    return 'Create default admin user for initial system access';
  }
}

export default CreateDefaultAdminUserMigration;