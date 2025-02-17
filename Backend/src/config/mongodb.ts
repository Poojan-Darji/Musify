import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(`${process.env.MONGODB_URL}/musify`);
    console.log("Database connected");
};

export default connectDB;
