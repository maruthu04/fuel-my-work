import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://127.0.0.1:27017/fuelmywork`, {

    });
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

export default connectDb;