import { Migration } from '../Migration.js';

/**
 * Migration: Initial Database Setup
 * Created: 2025-11-20T00:00:00.000Z
 */
class InitialDatabaseSetupMigration extends Migration {
  /**
   * Apply the migration
   */
  async up() {
    console.log('Applying migration: Initial Database Setup');
    
    // Create indexes for Users collection
    await this.createIndex('users', { userid: 1 }, { unique: true });
    await this.createIndex('users', { status: 1 });
    await this.createIndex('users', { role: 1 });
    await this.createIndex('users', { createdAt: -1 });
    
    // Create indexes for Contact Messages collection
    await this.createIndex('contact_messages', { createdAt: -1 });
    await this.createIndex('contact_messages', { status: 1 });
    await this.createIndex('contact_messages', { email: 1 });
    
    // Create indexes for Course Enquiries collection
    await this.createIndex('course_enquiries', { createdAt: -1 });
    await this.createIndex('course_enquiries', { status: 1 });
    await this.createIndex('course_enquiries', { course: 1 });
    
    // Create compound indexes for better query performance
    await this.createIndex('contact_messages', { status: 1, createdAt: -1 });
    await this.createIndex('course_enquiries', { status: 1, createdAt: -1 });
    
    console.log('✅ Initial database setup completed');
  }

  /**
   * Rollback the migration
   */
  async down() {
    console.log('Rolling back migration: Initial Database Setup');
    
    // Drop indexes from Users collection
    await this.dropIndex('users', 'userid_1');
    await this.dropIndex('users', 'status_1');
    await this.dropIndex('users', 'role_1');
    await this.dropIndex('users', 'createdAt_-1');
    
    // Drop indexes from Contact Messages collection
    await this.dropIndex('contact_messages', 'createdAt_-1');
    await this.dropIndex('contact_messages', 'status_1');
    await this.dropIndex('contact_messages', 'email_1');
    await this.dropIndex('contact_messages', 'status_1_createdAt_-1');
    
    // Drop indexes from Course Enquiries collection
    await this.dropIndex('course_enquiries', 'createdAt_-1');
    await this.dropIndex('course_enquiries', 'status_1');
    await this.dropIndex('course_enquiries', 'course_1');
    await this.dropIndex('course_enquiries', 'status_1_createdAt_-1');
    
    console.log('✅ Initial database setup rollback completed');
  }

  /**
   * Migration description
   */
  description() {
    return 'Initial database setup with indexes for performance optimization';
  }
}

export default InitialDatabaseSetupMigration;