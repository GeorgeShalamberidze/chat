import { Error } from "mongoose";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(
    token,
    SECRET_KEY,
    (err: JsonWebTokenError, decoded: string | jwt.JwtPayload) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      req.body.token = decoded;
      next();
    }
  );
};
