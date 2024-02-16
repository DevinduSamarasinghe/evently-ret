import mongoose from 'mongoose';	

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
    if (cached.conn) {
        // If there's already a cached connection, return it
        return cached.conn;
    }

    if (!MONGODB_URI) {
        throw new Error("MongoDB URI is missing");
    }

    if (!cached.promise) {
        // Initialize the connection promise only once
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: 'evently',
            bufferCommands: false, // Ensure no commands are buffered
        });
    }

    // Await the promise and store the connection in the cache
    cached.conn = await cached.promise;
    return cached.conn;
};
