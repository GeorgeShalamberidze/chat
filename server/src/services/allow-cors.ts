import { NextFunction, Request, Response } from "express";

const allowCors =
  (fn: { (req: Request, res: Response, next: NextFunction): void }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers);
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );

    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    next();
    return await fn(req, res, next);
  };

export default allowCors;
