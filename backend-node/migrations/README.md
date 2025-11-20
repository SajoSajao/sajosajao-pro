# Database Migration System

A comprehensive database migration system for the Beauty Academy project using MongoDB and Mongoose.

## 📋 Overview

This migration system provides:
- **Version-controlled database changes**
- **Rollback capabilities**
- **Migration tracking**
- **CLI tools for easy management**
- **Best practices and safety features**

## 🏗️ Structure

```
backend-node/migrations/
├── Migration.js              # Base migration class
├── MigrationManager.js       # Core migration logic
├── MigrationRecord.js        # Migration tracking schema
└── versions/                 # Migration files
    ├── 20251120000000_initial_database_setup.js
    ├── 20251120000100_create_default_admin_user.js
    └── 20251120000200_create_custom_admin_user.js
```

## 🚀 Quick Start

### 1. Run Pending Migrations
```bash
npm run migrate
# or
npm run migrate:up
```

### 2. Check Migration Status
```bash
npm run migrate:status
```

### 3. Create New Migration
```bash
npm run migrate:create "add user profile fields"
```

### 4. Rollback Migrations
```bash
npm run migrate:down
```

## 📖 CLI Commands

### Migration Commands

| Command | Description | Example |
|---------|-------------|---------|
| `npm run migrate` | Run all pending migrations | `npm run migrate` |
| `npm run migrate:up` | Run pending migrations | `npm run migrate:up` |
| `npm run migrate:down` | Rollback last migration | `npm run migrate:down` |
| `npm run migrate:status` | Show migration status | `npm run migrate:status` |
| `npm run migrate:create <name>` | Create new migration | `npm run migrate:create "add user fields"` |
| `npm run migrate:dry-run` | Preview migrations without executing | `npm run migrate:dry-run` |

### Advanced Commands

| Command | Description | Example |
|---------|-------------|---------|
| `node scripts/migrate.js up --target <version>` | Run migrations up to specific version | `node scripts/migrate.js up --target 20251120000100` |
| `node scripts/migrate.js down --steps 3` | Rollback specific number of migrations | `node scripts/migrate.js down --steps 3` |
| `node scripts/migrate.js down --target <version>` | Rollback to specific version | `node scripts/migrate.js down --target 20251120000000` |

### Danger Zone ⚠️

| Command | Description | Safety |
|---------|-------------|--------|
| `node scripts/migrate.js reset --force` | Rollback ALL migrations | 🚨 Requires --force |
| `node scripts/migrate.js fresh --force` | Reset + run all migrations | 🚨 Requires --force |

## ✍️ Writing Migrations

### 1. Create Migration File
```bash
npm run migrate:create "add email verification"
```

### 2. Edit Migration File
```javascript
import { Migration } from '../Migration.js';

class AddEmailVerificationMigration extends Migration {
  async up() {
    console.log('Applying migration: Add Email Verification');
    
    // Add field with default value
    await this.addField('users', 'isEmailVerified', false);
    
    // Create index
    await this.createIndex('users', { isEmailVerified: 1 });
    
    // Transform existing data
    await this.transformData('users', (doc) => {
      if (doc.status === 'active') {
        doc.isEmailVerified = true;
      }
      return doc;
    });
  }

  async down() {
    console.log('Rolling back migration: Add Email Verification');
    
    // Remove field
    await this.removeField('users', 'isEmailVerified');
    
    // Drop index
    await this.dropIndex('users', 'isEmailVerified_1');
  }

  description() {
    return 'Add email verification field to users';
  }
}

export default AddEmailVerificationMigration;
```

## 🛠️ Available Helper Methods

### Index Management
```javascript
// Create index
await this.createIndex('users', { email: 1 }, { unique: true });

// Drop index
await this.dropIndex('users', 'email_1');
```

### Field Operations
```javascript
// Add field with default value
await this.addField('users', 'isVerified', false);

// Remove field
await this.removeField('users', 'oldField');

// Rename field
await this.renameField('users', 'oldName', 'newName');
```

### Data Transformation
```javascript
// Transform documents
await this.transformData('users', (doc) => {
  doc.fullName = `${doc.firstName} ${doc.lastName}`;
  return doc;
});

// Transform with filter
await this.transformData('users', (doc) => {
  doc.updatedAt = new Date();
  return doc;
}, { status: 'active' });
```

### Collection Utilities
```javascript
// Check if collection exists
const exists = await this.collectionExists('users');

// Direct MongoDB operations
const db = mongoose.connection.db;
await db.collection('users').updateMany({}, { $set: { newField: 'value' } });
```

## 📊 Migration Tracking

Migrations are tracked in the `migrations` collection:

```javascript
{
  version: "20251120000000_initial_database_setup",
  name: "20251120000000_initial_database_setup", 
  description: "Initial database setup with indexes",
  executedAt: ISODate("2025-11-20T10:30:00.000Z"),
  executionTime: 1250, // milliseconds
  status: "completed", // completed, failed, rolled_back
  error: null
}
```

## 🔒 Best Practices

### 1. Migration Naming
- Use descriptive names: `add_user_profile_fields`
- Use snake_case for consistency
- Keep names concise but clear

### 2. Migration Structure
```javascript
class MyMigration extends Migration {
  async up() {
    // Apply changes
    console.log('Applying migration: My Migration');
    // ... implementation
  }

  async down() {
    // Rollback changes (reverse of up())
    console.log('Rolling back migration: My Migration');
    // ... rollback implementation
  }

  description() {
    return 'Brief description of what this migration does';
  }
}
```

### 3. Safety Guidelines
- **Always implement down() method** for rollbacks
- **Test migrations on development data first**
- **Use transactions for critical operations**
- **Backup production data before running migrations**
- **Use dry-run to preview changes**

### 4. Data Safety
```javascript
// ✅ Good: Check before creating
const exists = await this.collectionExists('users');
if (!exists) {
  // Create collection
}

// ✅ Good: Handle existing data
await this.addField('users', 'newField', 'defaultValue');

// ❌ Bad: Assuming data structure
// doc.user.profile.name = 'value'; // might fail if user.profile doesn't exist
```

### 5. Index Management
```javascript
// ✅ Good: Use helper methods (handles errors)
await this.createIndex('users', { email: 1 }, { unique: true });

// ✅ Good: Drop indexes in down() method
await this.dropIndex('users', 'email_1');
```

## 🔧 Environment Setup

### Required Environment Variables
```bash
MONGODB_URI=mongodb://localhost:27017/beauty_academy
```

### Database Connection
The migration system automatically connects to MongoDB using the same connection string as your main application.

## 📈 Monitoring and Debugging

### Check Migration Status
```bash
npm run migrate:status
```

Output:
```
📊 Migration Status:
==================
Available migrations: 3
Executed migrations:  2
Failed migrations:    0
Pending migrations:   1

📋 Pending Migrations:
   20251120000200_create_custom_admin_user: Create custom admin user

📋 Executed Migrations:
   ✅ 20251120000000_initial_database_setup
   ✅ 20251120000100_create_default_admin_user
```

### Dry Run
```bash
npm run migrate:dry-run
```

### View Migration History
Query the migrations collection:
```javascript
db.migrations.find().sort({ executedAt: -1 })
```

## 🚨 Troubleshooting

### Common Issues

1. **Connection Error**
   ```
   Error: Failed to connect to MongoDB
   ```
   - Check MONGODB_URI environment variable
   - Ensure MongoDB is running
   - Check network connectivity

2. **Migration Already Exists**
   ```
   Error: Migration already exists
   ```
   - Migration was already executed
   - Check status: `npm run migrate:status`

3. **Rollback Error**
   ```
   Error: down() method not implemented
   ```
   - Implement down() method in migration
   - Or mark migration as non-rollback-able

4. **Index Creation Error**
   ```
   Error: Index already exists
   ```
   - Helper methods handle this automatically
   - Check if using direct MongoDB commands

### Recovery Procedures

#### Reset Failed Migration
```bash
# Check status
npm run migrate:status

# If migration is marked as failed, you can:
# 1. Fix the migration code
# 2. Reset the migration record manually:
db.migrations.deleteOne({ version: "problematic_version" })

# 3. Re-run migrations
npm run migrate
```

#### Emergency Database Reset
```bash
# ⚠️ DANGER: This will reset everything
node scripts/migrate.js fresh --force
```

## 🎯 Initial Migration Setup

The project comes with initial migrations:

1. **20251120000000_initial_database_setup**
   - Creates indexes for all collections
   - Optimizes query performance

2. **20251120000100_create_default_admin_user**
   - Creates default admin user (admin/admin123)
   - For initial system access

3. **20251120000200_create_custom_admin_user**
   - Creates your custom admin user (shreegajeshji/#1ShreeGajeshJi)
   - Production-ready admin account

### Run Initial Setup
```bash
# Run all initial migrations
npm run migrate

# Check status
npm run migrate:status
```

## 📚 Examples

### Example 1: Add User Profile Fields
```javascript
class AddUserProfileMigration extends Migration {
  async up() {
    // Add new fields
    await this.addField('users', 'firstName', '');
    await this.addField('users', 'lastName', '');
    await this.addField('users', 'phone', '');
    await this.addField('users', 'profilePicture', null);
    
    // Create indexes
    await this.createIndex('users', { firstName: 1, lastName: 1 });
    await this.createIndex('users', { phone: 1 });
  }

  async down() {
    // Remove fields
    await this.removeField('users', 'firstName');
    await this.removeField('users', 'lastName');
    await this.removeField('users', 'phone');
    await this.removeField('users', 'profilePicture');
    
    // Drop indexes
    await this.dropIndex('users', 'firstName_1_lastName_1');
    await this.dropIndex('users', 'phone_1');
  }

  description() {
    return 'Add user profile fields (firstName, lastName, phone, profilePicture)';
  }
}
```

### Example 2: Data Transformation
```javascript
class NormalizeEmailsMigration extends Migration {
  async up() {
    // Transform all email addresses to lowercase
    await this.transformData('users', (doc) => {
      if (doc.email) {
        doc.email = doc.email.toLowerCase().trim();
      }
      return doc;
    });
    
    await this.transformData('contact_messages', (doc) => {
      if (doc.email) {
        doc.email = doc.email.toLowerCase().trim();
      }
      return doc;
    });
  }

  async down() {
    // Cannot reliably reverse email normalization
    console.log('ℹ️  Email normalization cannot be reversed');
  }

  description() {
    return 'Normalize email addresses to lowercase';
  }
}
```

## 🔮 Future Enhancements

- [ ] Migration dependencies system
- [ ] Parallel migration execution
- [ ] Migration branching for feature branches
- [ ] Integration with CI/CD pipelines
- [ ] Migration testing framework
- [ ] Performance monitoring
- [ ] Backup/restore integration

## 📞 Support

For issues or questions about the migration system:
1. Check the troubleshooting section above
2. Review migration logs
3. Check MongoDB connection and permissions
4. Ensure all environment variables are set correctly

---

**Remember**: Always backup your production database before running migrations!