import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

const allowCors =
  (fn: {
    (req: Request, res: Response): void;
    (
      arg0: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
      arg1: Response<any, Record<string, any>>
    ): any;
  }) =>
  async (req: Request, res: Response) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
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
    return await fn(req, res);
  };

const handler = (req: Request, res: Response) => {
  const d = new Date();
  res.end(d.toString());
};

export default allowCors(handler);
