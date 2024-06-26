import { NextFunction, Request, Response } from "express";

export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send({ message: "File uploaded", result: true });
  } catch (error) {
    next(error);
  }
};
