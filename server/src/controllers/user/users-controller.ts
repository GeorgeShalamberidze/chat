import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/user-model";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.find({}).select(["username"]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};
