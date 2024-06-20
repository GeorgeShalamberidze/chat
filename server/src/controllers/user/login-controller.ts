import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const login = async (
  req: Request<{}>,
  res: Response<Record<string, any>>,
  next: NextFunction
) => {
  const { username, password } = req.body;
  const foundUser = await UserModel.findOne({ username });

  if (!foundUser) {
    return res.status(400).json({
      message: "Username and/or Password does not exist",
      result: false,
    });
  } else {
    try {
      const isPasswordValid = await bcrypt.compareSync(
        password,
        foundUser.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({
          message: "Password is incorrect",
          result: false,
        });
      }
      const token = jwt.sign(
        { _id: foundUser._id.toString(), username },
        SECRET_KEY,
        {
          expiresIn: "10 days",
        }
      );
      return res.status(200).json({
        message: `Logged in as ${username}`,
        username,
        result: true,
        token,
      });
    } catch (error) {
      next(error);
      return res.status(500).json({ message: error.message, result: false });
    }
  }
};
