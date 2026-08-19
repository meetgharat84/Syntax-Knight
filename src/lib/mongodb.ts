import mongoose, { type Mongoose } from 'mongoose';

/**
 * Structure of the cached Mongoose connection object.
 */
interface MongooseConnectionCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Extend global type definition to include cached mongoose connection.
 * This prevents creating multiple connection pools during hot-reloading in Next.js development and serverless invocations.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseConnectionCache | undefined;
}

/**
 * Global cache reference.
 * In Next.js serverless environments, we store the connection in `globalThis` to reuse connections across lambdas.
 */
let cached: MongooseConnectionCache = globalThis.mongooseCache || {
  conn: null,
  promise: null,
};

if (!globalThis.mongooseCache) {
  globalThis.mongooseCache = cached;
}

/**
 * Establishes a cached connection to MongoDB using Mongoose.
 * Safe for use in Next.js API Routes, Server Actions, and Server Components.
 *
 * @returns {Promise<Mongoose>} Active Mongoose connection instance
 */
export async function connectToDatabase(): Promise<Mongoose> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    const errMsg = 'CRITICAL: MONGODB_URI environment variable is missing. Please configure it in .env.local or Vercel.';
    console.error(`[MONGODB_ERROR] ${errMsg}`);
    throw new Error(errMsg);
  }

  // If connection is already established and active, return it immediately
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // If cached connection lost state or disconnected, reset cache
  if (cached.conn && mongoose.connection.readyState !== 1) {
    console.warn('[MONGODB_WARN] Existing MongoDB connection is not open (readyState !== 1). Reconnecting...');
    cached.conn = null;
    cached.promise = null;
  }

  // If a connection promise is not already in flight, create one
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
        console.log('⚡ [MONGODB_SUCCESS] Successfully connected to MongoDB Atlas database.');
        return mongooseInstance;
      })
      .catch((error: unknown) => {
        cached.promise = null;
        cached.conn = null;
        console.error('[MONGODB_CONNECTION_ERROR] Failed connecting to MongoDB Atlas:', error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    console.error('[MONGODB_AWAIT_ERROR] Exception resolving MongoDB connection promise:', error);
    throw error;
  }

  return cached.conn;
}

export const dbConnect = connectToDatabase;
export default connectToDatabase;

