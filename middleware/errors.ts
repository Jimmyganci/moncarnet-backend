import { Request, Response } from "express";
require("dotenv").config();

class ErrorHandler extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err: ErrorHandler, req: Request, res: Response) => {
  // manage environment PROD/DEV
  const { statusCode = 500, message } = err;

  // show message only in dev environment
  if (process.env.NODE_ENV === "DEV") {
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message: message,
    });
  } else {
    res.status(statusCode).json({
      status: "error",
      statusCode,
    });
  }
};

export { ErrorHandler, handleError };
