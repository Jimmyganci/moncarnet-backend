import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

function checkToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { user_token } = req.cookies;

    if (typeof user_token === "undefined") {
      throw new Error("You need to login.");
    }

    req.userLogin = jwt.verify(user_token, process.env.TOKEN as string);

    if (req.userLogin.origin !== "MonCarnet") {
      throw new Error("You need to login");
    }
    return next();
  } catch (err) {
    res.status(401);

    return next(err);
  }
}

export default checkToken;
