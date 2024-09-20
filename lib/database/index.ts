import mongoose, { Connection } from 'mongoose';
import logger from '../logger';

const MONGODB_URI = process.env.MONGODB_URI;

// Global interface for mongoose cache
interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Add Mongoose to the global type for caching in TypeScript
let cached: MongooseCache = (global as any).mongoose || { conn: null, promise: null };

// Save the cached connection globally
(global as any).mongoose = cached;

export const connectToDatabase = async (): Promise<Connection> => {
  if (cached.conn) {
    logger.info('Using cached database connection');
    return cached.conn;
  }

  if (!MONGODB_URI) {
    const errorMsg = 'MongoDB URI is missing';
    logger.error(errorMsg);
    throw new Error(errorMsg);
  }

  if (cached.promise == null || cached.promise == undefined) {
    logger.info('Initializing new database connection');
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'evently',
      bufferCommands: false, // Ensure no commands are buffered
    }).then((mongooseInstance) => {
      return mongooseInstance.connection;
    });
  }

  try {
    cached.conn = await cached.promise;
    logger.info('Successfully connected to the MongoDB database');
  } catch (err: any) {
    logger.error(`Database connection failed: ${err.message}`);
    throw err.message;
  }

  return cached.conn;
};
