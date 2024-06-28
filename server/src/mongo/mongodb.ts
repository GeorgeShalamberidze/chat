import dotenv from "dotenv";
import mongoose, { Error } from "mongoose";

dotenv.config();

mongoose.Promise = global.Promise;

const { MONGO_URL } = process.env;

const connectToDatabase = async (): Promise<void> => {
  await mongoose
    .connect(MONGO_URL)
<<<<<<< HEAD
    .then(() => console.log("MongoDB Connected"))
=======
>>>>>>> parent of c191102 (refactor)
    .catch((e: Error) => console.error(e.message));
};

export { connectToDatabase };
