import mongoose, { Mongoose } from "mongoose";
import { config } from "../config/config.ts";

const connectDB = async () => {
  try {
    const MONGODB_URI = config.MONGODB_URI;
    const DB_NAME = config.DB_NAME;
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI}/${DB_NAME}`,
    );
    console.log(
      `Connected to MongoDB Instance: ${connectionInstance.connection.host}`,
    );
    console.log(
      `Connected MongoDB Name: ${connectionInstance.connection.name}`,
    );

    mongoose.connection.on("error", (err) => {
      console.log(`MongoDB Connection Error: ${err}`);
    });
    
  } catch (err) {
    console.log(`Failed to connect MongoDB: ${err}`);
    process.exit(1);
  }
};

export default connectDB;
