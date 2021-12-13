import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const usersRouter = require("express").Router();

const prisma = new PrismaClient();

usersRouter.get("/", async (req: Request, res: Response) => {
  const users = await prisma.users.findMany();
  res.json(users);
});

usersRouter.post("/", async (req: Request, res: Response) => {
  const users = await prisma.users.create({
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
  res.json(users);
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
  res.status(200).json(userDelete).send("User deleted!");
});

module.exports = usersRouter;
