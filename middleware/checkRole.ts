import { NextFunction, Request, Response } from "express";

function checkRole(req: Request, res: Response, next: NextFunction): void {
  const { roleId } = req.userLogin;

  try {
    if (typeof req.userLogin === "undefined") {
      throw new Error("You need to login.");
    }

    if (roleId !== "id_admin") {
      throw new Error("Only administrators can acces this ressource");
    }

    return next();
  } catch (err) {
    res.status(401);

    return next(err);
  }
}

export default checkRole;
