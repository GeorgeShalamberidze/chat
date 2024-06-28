import { NextFunction, Request, Response } from "express";
import { FileModel } from "../../models/file-model";
import multer from "multer";

export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { originalname: filename, destination: path } = req.file;

    console.log(req.file);

    const newFile = await FileModel.create({
      filename,
      path,
    });

    newFile.save();

    res.json({ message: "File uploaded successfully!", url: `/${filename}` });
  } catch (error) {
    next(error);
  }
};
