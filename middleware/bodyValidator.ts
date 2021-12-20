import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

// Here is the function who's purpose is to check if the data received from the client are correct
// JOI check both format and required fields and send an error to the middleware if there is one.

export default function postSchemaValidator(schema: ObjectSchema) {
  return function (req: Request, res: Response, next: NextFunction): void {
    const options = { abortEarly: false };

    const result = schema.validate(req.body, options);
    const { error } = result;
    const valid = error == null;

    if (!valid) {
      res.status(422);
      next(error);
    }
    next();
  };
}
