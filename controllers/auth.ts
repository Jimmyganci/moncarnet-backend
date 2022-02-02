import { Request, Response, NextFunction, Router } from "express";
import prisma from "../helpers/prisma";
import UserAuth from "../helpers/users";
import jwt from "jsonwebtoken";

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
const authRouter = Router();

authRouter.post(
  "/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).clearCookie("user_token").send(`user is NOT connected`);
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
authRouter.post(
  "/login_user",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const user = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) res.status(401).send("User not Found");
      if (user && user.active === false)
        res.status(403).send("User account has been deleted");
      else {
        user?.hashedPassword &&
          UserAuth.verifyPassword(password, user.hashedPassword).then(
            (passwordIsCorrect: boolean) => {
              if (passwordIsCorrect) {
                const token = UserAuth.calculateToken(
                  email,
                  user.id_user,
                  "MonCarnet",
                  Object.keys(user)[0]
                );
                res.cookie("user_token", token);
                res.status(200).send(`user ${user.id_user} connected`);
              } else {
                res.status(401).send("Invalid credentials");
              }
            }
          );
      }
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
authRouter.post(
  "/login_pro",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const pros = await prisma.pros.findUnique({
        where: {
          email: email,
        },
      });
      if (!pros) res.status(404).send("User pros not Found");
      else {
        UserAuth.verifyPassword(password, pros.hashedPassword).then(
          (passwordIsCorrect: boolean) => {
            if (passwordIsCorrect) {
              const token = UserAuth.calculateToken(
                email,
                pros.id_pros,
                "MonCarnet",
                Object.keys(pros)[0]
              );
              res.cookie("user_token", token);
              res.status(200).send(`pros with id ${pros.id_pros} connected`);
            } else {
              res.status(401).send("Invalid credentials");
            }
          }
        );
      }
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
authRouter.post(
  "/login_admin",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const admin = await prisma.admin.findUnique({
        where: {
          email: email,
        },
      });
      if (!admin) res.status(401).send("User not Found");
      else {
        admin?.hashedPassword &&
          UserAuth.verifyPassword(password, admin.hashedPassword).then(
            (passwordIsCorrect: boolean) => {
              if (passwordIsCorrect) {
                const token = UserAuth.calculateToken(
                  email,
                  admin.id_admin,
                  "MonCarnet",
                  Object.keys(admin)[0]
                );
                res.cookie("user_token", token);
                res.status(200).send(`Admin ${admin.id_admin} connected`);
              } else {
                res.status(401).send("Invalid credentials");
              }
            }
          );
      }
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
authRouter.get(
  "/connected",
  async (req: Request, res: Response, next: NextFunction) => {
    const { user_token } = req.cookies;
    try {
      const getUser = await jwt.verify(user_token, process.env.TOKEN as string);
      res.status(200).json(getUser);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = authRouter;
