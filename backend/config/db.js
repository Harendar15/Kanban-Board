import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_url)
        console.log("successfully connected to database");
    } catch (err){
        console.log(err);
        process.exit(1);
    }
};

export default connectDB;