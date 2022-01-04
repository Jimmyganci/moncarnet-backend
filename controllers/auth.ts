import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const authRouter = require("express").Router();
const UserAuth = require("../helpers/users");

const prisma = new PrismaClient();

authRouter.post("/particular/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) res.status(404).send("User not Found");
  else {
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
});
authRouter.post("/pros/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
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
});

module.exports = authRouter;
