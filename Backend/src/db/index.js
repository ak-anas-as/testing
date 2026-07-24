import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log("MONGODB IS CONNECTED");

    } catch (error) {
        console.log("CONNECTION FAILED", error);
    }
    }

export default connectDB

