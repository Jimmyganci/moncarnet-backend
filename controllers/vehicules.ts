import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const vehiculesRouter = require("express").Router();

const prisma = new PrismaClient();

// get many vehicules informations with brands, models
vehiculesRouter.get("/", async (req: Request, res: Response) => {
  const vehicules = await prisma.vehicules.findMany({
    select: {
      immat: true,
      registration_date: true,
      models: {
        include: { brand: true },
      },
      users: {
        select: { firstname: true, lastname: true, email: true, address: true },
      },
      types: {
        select: { name_type: true },
      },
      url_vehiculeRegistration: true,
    },
  });
  res.json(vehicules);
});

vehiculesRouter.post("/", async (req: Request, res: Response) => {
  const vehicules = await prisma.vehicules.create({
    data: {
      immat: req.body.immat,
      registration_date: req.body.registration_date,
      model_id_model: req.body.model_id_model,
      user_id_user: req.body.user_id_user,
      types_id_type: req.body.types_id_type,
      url_vehiculeRegistration: req.body.url_vehiculeRegistration,
    },
  });
  res.json(vehicules);
});

vehiculesRouter.put("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const vehiculeUpdate = await prisma.vehicules.update({
    where: {
      immat: id,
    },
    data: {
      immat: req.body.immat,
      registration_date: req.body.registration_date,
      model_id_model: req.body.model_id_model,
      user_id_user: req.body.user_id_user,
      types_id_type: req.body.types_id_type,
      url_vehiculeRegistration: req.body.url_vehiculeRegistration,
    },
  });
  res.json(vehiculeUpdate);
});

vehiculesRouter.delete("/", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const vehiculeDeleted = await prisma.vehicules.delete({
    where: {
      immat: id,
    },
  });
  res.json(vehiculeDeleted);
});

module.exports = vehiculesRouter;
