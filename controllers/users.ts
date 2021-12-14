import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const usersRouter = require("express").Router();
const UserAuth = require("../helpers/users");

const prisma = new PrismaClient();

usersRouter.get("/", async (req: Request, res: Response) => {
  const users = await prisma.users.findMany();
  res.json(users);
});

usersRouter.post("/", async (req: Request, res: Response) => {
  const {
    firstname,
    lastname,
    email,
    password,
    address,
    phone,
    postal_code,
    city,
  } = req.body;
  const emailExisting = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });
  if (!email) {
    UserAuth.hashPassword(password)
      .then((hashedPassword: string) => {
        prisma.users
          .create({
            data: {
              firstname: firstname,
              lastname: lastname,
              email: email,
              hashedPassword: hashedPassword,
              address: address,
              phone: phone,
              postal_code: postal_code,
              city: city,
            },
          })
          .then((res) => console.log(res))
          .catch((err) => res.send(err));
      })
      .then(() =>
        res.json({
          firstname,
          lastname,
          email,
          address,
          phone,
          postal_code,
          city,
        })
      )
      .catch((err: Error) => res.send(err));
  } else {
    res.status(409).send("Email already used");
  }
});

usersRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  const userUpdate = await prisma.users.update({
    where: {
      id_user: id,
    },
    data: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      hashedPassword: req.body.hashedPassword,
      address: req.body.address,
      phone: req.body.phone,
      postal_code: req.body.postal_code,
      city: req.body.city,
    },
  });
  res.json(userUpdate);
});

usersRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const userDelete = await prisma.users.delete({
    where: {
      id_user: id,
    },
  });
  res.status(200).send("User deleted!");
});

module.exports = usersRouter;
