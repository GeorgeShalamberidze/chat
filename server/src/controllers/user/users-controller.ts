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

    if (!users && users.length === 0) {
      return res.status(200).json([]);
    } else {
      return res.status(200).json(users);
    }
  } catch (error) {
    next(error);
  }
};
