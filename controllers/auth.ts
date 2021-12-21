import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const authRouter = require("express").Router();
const UserAuth = require("../helpers/users");

const prisma = new PrismaClient();

authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) res.status(401).send("User not Found");
  else {
    UserAuth.verifyPassword(password, user.hashedPassword).then(
      (passwordIsCorrect: boolean) => {
        if (passwordIsCorrect) {
          const token = UserAuth.calculateToken(
            email,
            user.id_user,
            "MonCarnet"
          );
          res.cookie("user_token", token);
          res.status(200).send("User connected");
        } else {
          res.status(401).send("Invalid credentials");
        }
      }
    );
  }
});

// authRouter.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   User.findByEmail(email).then((user) => {
//     if (!user) res.status(401).send("Invalid credentials");
//     else {
//       User.verifyPassword(password, user.hashedPassword).then(
//         (passwordIsCorrect) => {
//           if (passwordIsCorrect) {
//             const token = calculateToken(email, user.id);
//             res.cookie("user_token", token);
//             res.send();
//           } else res.status(401).send("Invalid credentials");
//         }
//       );
//     }
//   });
// });

module.exports = authRouter;
