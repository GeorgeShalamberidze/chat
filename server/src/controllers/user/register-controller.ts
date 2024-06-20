import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../../models/user-model";

export const register = async (
  req: Request<{}>,
  res: Response<Record<string, any>>,
  next: NextFunction
) => {
  const { username, password } = req.body;
  const foundUser = await UserModel.findOne({ username });

  if (foundUser) {
    return res
      .status(400)
      .json({ message: "User already exists", result: false });
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      const createUser = await UserModel.create({
        username,
        password: hashedPass,
      });

      // If Succeeded
      await createUser.save();
      return res.status(201).json({
        username,
        message: `${username} was created successfully`,
        result: true,
      });
    } catch (error) {
      next(error);
      return res.status(500).json({ message: error.message, result: false });
    }
  }
};
