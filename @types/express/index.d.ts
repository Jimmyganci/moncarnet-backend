// import * as express from "express";
import IUserLogin from "../../interfaces/IUserLogin";
declare global {
  namespace Express {
    interface Request {
      userLogin: IUserLogin;
      //   files?: FileArray | undefined;
    }
  }
}
