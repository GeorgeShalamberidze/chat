import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/user-model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const register = async (
  req: Request,
  res: Response,
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
      const token = jwt.sign(
        { _id: createUser._id.toString(), username },
        SECRET_KEY,
        {
          expiresIn: "10 days",
        }
      );

      await createUser.save();
      return res.status(201).json({
        username,
        token,
        id: createUser._id,
        result: true,
        message: `${username} was created successfully`,
      });
    } catch (error) {
      next(error);
      return res.status(500).json({ message: error.message, result: false });
    }
  }
};
