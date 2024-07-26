import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async (dbUri) => {
    try {
        const connectionInstance = await mongoose.connect(dbUri)
        // console.log('MongoDB connected! Instance is ', connectionInstance)
    } catch (error) {
        console.log("MongoDB connection error: ", error)
        process.exit(1)
    }
}

export default connectDB