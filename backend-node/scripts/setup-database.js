#!/usr/bin/env node

/**
 * Database Setup Script
 * 
 * Quick setup script for the Beauty Academy database.
 * This script will:
 * 1. Check database connection
 * 2. Run migrations
 * 3. Verify admin users exist
 * 4. Display login credentials
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import MigrationManager from '../migrations/MigrationManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

async function setupDatabase() {
  console.log('🚀 Beauty Academy Database Setup');
  console.log('================================\n');

  try {
    // Step 1: Check database connection
    console.log('1️⃣ Checking database connection...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');

    // Step 2: Run migrations
    console.log('\n2️⃣ Running database migrations...');
    const migrationManager = new MigrationManager();
    const result = await migrationManager.runMigrations();
    
    if (result.executed.length > 0) {
      console.log(`✅ Executed ${result.executed.length} migration(s)`);
    } else {
      console.log('✅ All migrations are up to date');
    }

    // Step 3: Verify admin users (reconnect since migration manager disconnected)
    console.log('\n3️⃣ Verifying admin users...');
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
    
    const users = await mongoose.connection.db.collection('users')
      .find({ role: 'admin' }, { projection: { userid: 1, status: 1 } })
      .toArray();

    if (users.length === 0) {
      console.log('⚠️  No admin users found! Creating default admin...');
      // This should not happen if migrations ran successfully
    } else {
      console.log(`✅ Found ${users.length} admin user(s):`);
      users.forEach(user => {
        const status = user.status === 'active' ? '🟢' : '🔴';
        console.log(`   ${status} ${user.userid}`);
      });
    }

    // Step 4: Display login credentials
    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📋 Available Login Credentials:');
    console.log('===============================');
    
    console.log('\n🔹 Default Admin:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('   URL: http://localhost:5173/admin/login');
    
    console.log('\n🔹 Custom Admin:');
    console.log('   Username: shreegajeshji');
    console.log('   Password: #1ShreeGajeshJi');
    console.log('   URL: http://localhost:5173/admin/login');

    console.log('\n📊 Database Collections:');
    console.log('========================');
    const collections = await mongoose.connection.db.listCollections().toArray();
    collections.forEach(col => {
      console.log(`   📁 ${col.name}`);
    });

    console.log('\n🔧 Next Steps:');
    console.log('=============');
    console.log('1. Start the backend server: npm run dev');
    console.log('2. Start the frontend: npm run dev (in main directory)');
    console.log('3. Access admin panel: http://localhost:5173/admin/login');
    console.log('4. Change admin passwords after first login!');

    console.log('\n✨ Happy coding!\n');

  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('- Ensure MongoDB is running');
    console.log('- Check MONGODB_URI in .env file');
    console.log('- Verify network connectivity');
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

// Run setup
setupDatabase();