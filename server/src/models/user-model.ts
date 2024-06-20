import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 18,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 3,
    max: 18,
  },
});

export const UserModel = mongoose.model<UserDocument>("Users", userSchema);
