import { NextFunction, Request, Response } from "express";

export const register = (
  req: Request<{}>,
  res: Response<Record<string, any>>,
  next: NextFunction
) => {
  res.send({ result: true });
};
