import mongoose from "mongoose";

export interface IFile extends mongoose.Document {
  filename: string;
  path: string;
}

const FileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

export const FileModel = mongoose.model<IFile>("Files", FileSchema);
