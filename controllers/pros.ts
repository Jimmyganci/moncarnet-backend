import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prosRouter = require("express").Router();

const prisma = new PrismaClient();

prosRouter.get("/", async (req: Request, res: Response) => {
  const pros = await prisma.pros.findMany();
  res.json(pros);
});
// authorization : admin only
prosRouter.post("/", async (req: Request, res: Response) => {
  const {
    name,
    email,
    hashedPassword,
    adress,
    phone,
    postal_code,
    city,
    siret,
  } = req.body;
  const pros = await prisma.pros.create({
    data: {
      name: name,
      email: email,
      hashedPassword: hashedPassword,
      adress: adress,
      phone: phone,
      postal_code: postal_code,
      city: city,
      siret: siret,
    },
  });
  res.status(200).json(pros);
});

prosRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  const prosUpdate = await prisma.pros.update({
    where: {
      id_pros: id,
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      hashedPassword: req.body.hashedPassword,
      adress: req.body.adress,
      phone: req.body.phone,
      postal_code: req.body.postal_code,
      city: req.body.city,
      siret: req.body.siret,
    },
  });
  res.json(prosUpdate);
});

prosRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const prosDelete = await prisma.pros.delete({
    where: {
      id_pros: id,
    },
  });
  res.status(200).json(prosDelete).send("User deleted!");
});

module.exports = prosRouter;
