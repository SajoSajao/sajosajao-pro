import mongoose from 'mongoose';

/**
 * Base Migration Class
 * 
 * All migrations should extend this class and implement:
 * - up(): Method to apply the migration
 * - down(): Method to rollback the migration
 * - description(): Brief description of what the migration does
 */
export class Migration {
  constructor(version) {
    this.version = version;
    this.executedAt = null;
  }

  /**
   * Apply the migration
   * Must be implemented by subclasses
   */
  async up() {
    throw new Error('up() method must be implemented');
  }

  /**
   * Rollback the migration
   * Must be implemented by subclasses
   */
  async down() {
    throw new Error('down() method must be implemented');
  }

  /**
   * Get description of the migration
   * Must be implemented by subclasses
   */
  description() {
    throw new Error('description() method must be implemented');
  }

  /**
   * Check if collection exists
   */
  async collectionExists(collectionName) {
    try {
      const collections = await mongoose.connection.db.listCollections({ name: collectionName }).toArray();
      return collections.length > 0;
    } catch (error) {
      console.error(`Error checking collection ${collectionName}:`, error);
      return false;
    }
  }

  /**
   * Create an index safely
   */
  async createIndex(collection, indexSpec, options = {}) {
    try {
      await mongoose.connection.db.collection(collection).createIndex(indexSpec, options);
      console.log(`✅ Index created on ${collection}:`, indexSpec);
    } catch (error) {
      if (error.code === 85) { // Index already exists
        console.log(`ℹ️  Index already exists on ${collection}:`, indexSpec);
      } else {
        throw error;
      }
    }
  }

  /**
   * Drop an index safely
   */
  async dropIndex(collection, indexName) {
    try {
      await mongoose.connection.db.collection(collection).dropIndex(indexName);
      console.log(`✅ Index dropped from ${collection}: ${indexName}`);
    } catch (error) {
      if (error.code === 27) { // Index doesn't exist
        console.log(`ℹ️  Index doesn't exist on ${collection}: ${indexName}`);
      } else {
        throw error;
      }
    }
  }

  /**
   * Add field to documents in collection
   */
  async addField(collection, field, defaultValue, filter = {}) {
    try {
      const updateQuery = {};
      updateQuery[field] = { $exists: false };
      const setQuery = {};
      setQuery[field] = defaultValue;

      const result = await mongoose.connection.db.collection(collection).updateMany(
        { ...filter, ...updateQuery },
        { $set: setQuery }
      );

      console.log(`✅ Added field '${field}' to ${result.modifiedCount} documents in ${collection}`);
      return result;
    } catch (error) {
      console.error(`Error adding field '${field}' to ${collection}:`, error);
      throw error;
    }
  }

  /**
   * Remove field from documents in collection
   */
  async removeField(collection, field, filter = {}) {
    try {
      const unsetQuery = {};
      unsetQuery[field] = "";

      const result = await mongoose.connection.db.collection(collection).updateMany(
        filter,
        { $unset: unsetQuery }
      );

      console.log(`✅ Removed field '${field}' from ${result.modifiedCount} documents in ${collection}`);
      return result;
    } catch (error) {
      console.error(`Error removing field '${field}' from ${collection}:`, error);
      throw error;
    }
  }

  /**
   * Rename field in documents
   */
  async renameField(collection, oldField, newField, filter = {}) {
    try {
      const renameQuery = {};
      renameQuery[oldField] = newField;

      const result = await mongoose.connection.db.collection(collection).updateMany(
        filter,
        { $rename: renameQuery }
      );

      console.log(`✅ Renamed field '${oldField}' to '${newField}' in ${result.modifiedCount} documents in ${collection}`);
      return result;
    } catch (error) {
      console.error(`Error renaming field '${oldField}' to '${newField}' in ${collection}:`, error);
      throw error;
    }
  }

  /**
   * Transform data in collection
   */
  async transformData(collection, transformFn, filter = {}) {
    try {
      const documents = await mongoose.connection.db.collection(collection).find(filter).toArray();
      let updatedCount = 0;

      for (const doc of documents) {
        const transformedDoc = await transformFn(doc);
        if (transformedDoc && transformedDoc !== doc) {
          await mongoose.connection.db.collection(collection).replaceOne(
            { _id: doc._id },
            transformedDoc
          );
          updatedCount++;
        }
      }

      console.log(`✅ Transformed ${updatedCount} documents in ${collection}`);
      return updatedCount;
    } catch (error) {
      console.error(`Error transforming data in ${collection}:`, error);
      throw error;
    }
  }
}

export default Migration;