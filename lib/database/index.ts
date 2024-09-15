import mongoose from 'mongoose';	

const MONGODB_URI = process.env.MONGOD_URI

let cached = (global as any).mongoose || {conn: null, promise: null}

export const connectToDatabase = async ()=>{
    
    if (cached.conn) return cached.conn;

    if(!MONGODB_URI) throw new Error("MongoDB URI is Missing")

    /**
     * In serverless functions, each invocation creates a new instance of the function. 
     * To avoid this, we can cache the connection and promise so that the connection is not instantiated again
     */

    cached.promise - cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'evently',
        bufferCommands: false,
    });

    cached.conn = await cached.promise;
    return cached.conn;
}