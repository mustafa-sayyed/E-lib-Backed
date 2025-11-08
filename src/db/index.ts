import mongoose, { Mongoose } from "mongoose";

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    const DB_NAME = process.env.DB_NAME;
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI}/${DB_NAME}`,
    );
    console.log(
      `Connected to MongoDB Instance: ${connectionInstance.connection.host}`,
    );
    console.log(
      `Connected MongoDB Name: ${connectionInstance.connection.name}`,
    );
  } catch (err) {
    console.log(`Failed to connect MongoDB: ${err}`);
    process.exit(1);
  }
};

export default connectDB;
