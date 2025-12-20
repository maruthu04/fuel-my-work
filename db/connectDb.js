import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    // 1. Check if the environment variable is set
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined in your environment variables");
    }

    // 2. Connect using the variable
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // Fixed the typo in your console log (added the $)
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDb;