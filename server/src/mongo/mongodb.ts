import dotenv from "dotenv";
import mongoose, { Error } from "mongoose";

dotenv.config();

mongoose.Promise = global.Promise;

const MONGO_URL = process.env.MONGO_URL;

const connectToDatabase = async (): Promise<void> => {
  await mongoose
    .connect(MONGO_URL)
    .catch((e: Error) => console.error(e.message));
};

export { connectToDatabase };
