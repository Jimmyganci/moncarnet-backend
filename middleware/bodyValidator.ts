import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

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
