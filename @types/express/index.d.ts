// import * as express from "express";
import { FileArray } from "express-fileupload";
import IUserLogin from "../../interfaces/IUserLogin";
declare global {
  namespace Express {
    interface Request {
      userLogin: IUserLogin;
      //   files?: FileArray | undefined;
    }
  }
}
