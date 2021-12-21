import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function checkToken(req: any, res: Response, next: NextFunction) {
  try {
    const { user_token } = req.cookies;

    if (typeof user_token === "undefined") {
      throw new Error("You need to login.");
    }

    req.user = jwt.verify(user_token, process.env.TOKEN as string);

    return next();
  } catch (err) {
    res.status(401);

    return next(err);
  }
}

export default checkToken;
