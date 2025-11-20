import { Migration } from '../Migration.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

/**
 * Migration: Create Custom Admin User
 * Created: 2025-11-20T00:02:00.000Z
 */
class CreateCustomAdminUserMigration extends Migration {
  /**
   * Apply the migration
   */
  async up() {
    console.log('Applying migration: Create Custom Admin User');
    
    // Check if custom admin user already exists
    const existingUser = await mongoose.connection.db.collection('users')
      .findOne({ userid: 'shreegajeshji' });
    
    if (existingUser) {
      console.log('ℹ️  Custom admin user already exists, skipping creation');
      return;
    }

    // Create custom admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('#1ShreeGajeshJi', salt);

    const customAdminUser = {
      userid: 'shreegajeshji',
      password: hashedPassword,
      role: 'admin',
      status: 'active',
      lastLogin: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await mongoose.connection.db.collection('users').insertOne(customAdminUser);
    
    console.log('✅ Custom admin user created');
    console.log('   Username: shreegajeshji');
    console.log('   Password: #1ShreeGajeshJi');
    console.log('   Role: admin');
  }

  /**
   * Rollback the migration
   */
  async down() {
    console.log('Rolling back migration: Create Custom Admin User');
    
    // Remove the custom admin user
    const result = await mongoose.connection.db.collection('users')
      .deleteOne({ userid: 'shreegajeshji' });
    
    if (result.deletedCount > 0) {
      console.log('✅ Custom admin user removed');
    } else {
      console.log('ℹ️  Custom admin user not found');
    }
  }

  /**
   * Migration description
   */
  description() {
    return 'Create custom admin user (shreegajeshji) with specific credentials';
  }
}

export default CreateCustomAdminUserMigration;