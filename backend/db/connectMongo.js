import mongoose from "mongoose";
import asynchHandler from "express-async-handler";

const connectMongoDb = asynchHandler(async ()=>{
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MONGO DB...");
})

export default connectMongoDb;