import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI){
    throw new Error("Please define MONGODB_URI in env file.")
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn:null ,promise:null};
}

export async function connectToDB() {
    // due to edge cases , if already has connection return the connection
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        const opts = {
            bufferCommands : true,
            maxPoolSize:10//How many connection are made to mongoDB at a time
        }
        cached.promise = mongoose
                            .connect(MONGODB_URI,opts)
                            .then(()=>mongoose.connection)
    }
    try{
        cached.conn = await cached.promise
    }catch(error){
        cached.promise = null
        throw error
    }
    return cached.conn;
}