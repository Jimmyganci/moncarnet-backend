import { Request, Response, NextFunction } from "express";
import prisma from "../helpers/prisma";
import bodyValidator from "../middleware/bodyValidator";
import { postAdmin } from "../JOI/validate";
import AdminInfos from "../interfaces/IAdminInfos";
const UserAuth = require("../helpers/users");
const adminRouter = require("express").Router();
import checktoken from "../middleware/checkToken";
import checkRole from "../middleware/checkRole";

adminRouter.get(
  "/",
  checktoken,
  checkRole,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getAllAdmin = await prisma.admin.findMany();
      res.status(200).json(getAllAdmin);
    } catch (err) {
      next(err);
    }
  }
);

adminRouter.get(
  "/:idAdmin",
  checktoken,
  checkRole,
  async (req: Request, res: Response, next: NextFunction) => {
    const { idAdmin } = req.params;
    try {
      const getOneAdmin = await prisma.admin.findUnique({
        where: {
          id_admin: Number(idAdmin),
        },
        rejectOnNotFound: true,
      });
      res.status(201).json(getOneAdmin);
    } catch (err) {
      next(err);
    }
  }
);

adminRouter.post(
  "/",
  bodyValidator(postAdmin),
  async (req: Request, res: Response, next: NextFunction) => {
    const admin: AdminInfos = req.body;
    try {
      const emailExisting = await prisma.admin.findUnique({
        where: {
          email: admin.email,
        },
      });

      if (!emailExisting) {
        const hashedPassword = await UserAuth.hashPassword(admin.password);
        const createdAdmin = await prisma.admin.create({
          data: {
            firstname: admin.firstname,
            lastname: admin.lastname,
            email: admin.email,
            hashedPassword: hashedPassword,
          },
        });
        res.status(200).json(createdAdmin);
      } else {
        res.status(409).send("Email already used");
      }
    } catch (err) {
      next(err);
    }
  }
);

adminRouter.put(
  "/:idAdmin",
  bodyValidator(postAdmin),
  checktoken,
  checkRole,
  async (req: Request, res: Response, next: NextFunction) => {
    const { idAdmin } = req.params;
    const admin: AdminInfos = req.body;
    try {
      const emailExisting = await prisma.admin.findMany({
        where: {
          email: admin.email,
          NOT: {
            id_admin: Number(idAdmin),
          },
        },
      });

      if (!emailExisting.length) {
        const hashedPassword = await UserAuth.hashPassword(admin.password);
        const updatedAdmin = await prisma.admin.update({
          where: {
            id_admin: Number(idAdmin),
          },
          data: {
            firstname: admin.firstname,
            lastname: admin.lastname,
            email: admin.email,
            hashedPassword: hashedPassword,
          },
        });
        if (updatedAdmin) res.status(204).send("Admin updated");
      } else {
        res.status(409).send("Email already used!");
      }
    } catch (err) {
      next(err);
    }
  }
);

adminRouter.delete(
  "/:idAdmin",
  checktoken,
  checkRole,
  async (req: Request, res: Response, next: NextFunction) => {
    const { idAdmin } = req.params;
    try {
      const deletedAdmin = await prisma.admin.delete({
        where: {
          id_admin: Number(idAdmin),
        },
      });
      if (deletedAdmin) res.status(204).send("Admin deleted");
    } catch (err) {
      next(err);
    }
  }
);

export default adminRouter;
