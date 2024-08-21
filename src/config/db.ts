import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const mongoUrl = process.env.MONGO_URI;

if (!mongoUrl) {
  throw new Error('MONGO_URL is not defined in the environment variables');
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log('MongoDB connected successfully');
  } catch (error:any) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
