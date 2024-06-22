import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/user-model";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ourId = req.params.id;
    const users = await UserModel.find({ _id: { $nin: ourId } }).select([
      "username",
      "_id",
    ]); //exclude our ID from the collection

    return res.json(users);
  } catch (error) {
    next(error);
  }
};
