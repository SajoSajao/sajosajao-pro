import mongoose from 'mongoose';

/**
 * Migration tracking schema
 * Keeps track of which migrations have been executed
 */
const migrationSchema = new mongoose.Schema({
  version: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  executedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  executionTime: {
    type: Number, // milliseconds
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'failed', 'rolled_back'],
    default: 'completed',
    index: true
  },
  error: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Remove separate index definitions to avoid duplicates

const MigrationRecord = mongoose.model('MigrationRecord', migrationSchema, 'migrations');

export default MigrationRecord;