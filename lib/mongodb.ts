import mongoose, { type Mongoose } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local or .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

interface MongooseConnectionCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseConnectionCache | undefined;
}

let cached: MongooseConnectionCache = globalThis.mongooseCache || {
  conn: null,
  promise: null,
};

if (!globalThis.mongooseCache) {
  globalThis.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<Mongoose> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    const errMsg = 'CRITICAL: MONGODB_URI environment variable is missing. Please define it in .env.local or your environment configuration.';
    console.error(`[MONGODB_ERROR] ${errMsg}`);
    throw new Error(errMsg);
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (cached.conn && mongoose.connection.readyState !== 1) {
    console.warn('[MONGODB_WARN] Existing MongoDB connection is not open (readyState !== 1). Reconnecting...');
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('⚡ [MONGODB_SUCCESS] Successfully connected to MongoDB Atlas database!');
        return mongooseInstance;
      })
      .catch((error: unknown) => {
        cached.promise = null;
        cached.conn = null;
        console.error('❌ [MONGODB_CONNECTION_ERROR] Error connecting to MongoDB:', error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    console.error('❌ [MONGODB_AWAIT_ERROR] Exception resolving connection promise:', error);
    throw error;
  }

  return cached.conn;
}

export const dbConnect = connectToDatabase;
export default connectToDatabase;
