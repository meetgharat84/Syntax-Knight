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
 * This prevents creating multiple connection pools during hot-reloading in Next.js development.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseConnectionCache | undefined;
}

/**
 * Global cache reference.
 * In development, Next.js re-runs module code on hot reload, so we store the connection in `globalThis`.
 */
let cached: MongooseConnectionCache = globalThis.mongooseCache || {
  conn: null,
  promise: null,
};

if (!globalThis.mongooseCache) {
  globalThis.mongooseCache = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose and caches the connection.
 * Safe for use in Next.js API Routes, Server Actions, and Server Components.
 *
 * @returns {Promise<Mongoose>} Active Mongoose connection instance
 */
export async function connectToDatabase(): Promise<Mongoose> {
  const MONGODB_URI =
    process.env.MONGODB_URI ||
    'mongodb+srv://syntaxknight:syntaxknight123@cluster0.mongodb.net/syntaxknight?retryWrites=true&w=majority';

  // If connection is already established, return it immediately
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise is not already in flight, create one
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        return mongooseInstance;
      })
      .catch((error: unknown) => {
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
