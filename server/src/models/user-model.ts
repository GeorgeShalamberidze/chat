import mongoose, { Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  __v: number;
  username: string;
  password: string;
}

const userSchema: Schema = new mongoose.Schema<IUser>({
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

export const UserModel = mongoose.model<IUser>("users", userSchema);
