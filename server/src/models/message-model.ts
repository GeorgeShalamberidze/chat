import mongoose, { Date, mongo, Schema } from "mongoose";
import { IUser } from "./user-model";

export interface IMessage extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  message: {
    text: string;
    uploadUrl: string | null;
  };
  sender: mongoose.Schema.Types.ObjectId;
  users: Array<IUser>;
  createdAt: Date;
  updatedAt: Date;
  _v: number;
}

const messageSchema: Schema = new mongoose.Schema<IMessage>(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
      uploadUrl: {
        type: String,
      },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model<IMessage>("Messages", messageSchema);
