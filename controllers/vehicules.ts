import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { parse } from "path/posix";
const vehiculesRouter = require("express").Router();

const prisma = new PrismaClient();

// get many vehicules informations with brands, models
vehiculesRouter.get("/all", async (req: Request, res: Response) => {
  const vehicules = await prisma.vehicules.findMany();
  res.json(vehicules);
});
vehiculesRouter.get("/:id", async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const vehicules = await prisma.vehicules.findUnique({
    where: {
      immat: id,
    },
  });
  res.json(vehicules);
});
vehiculesRouter.get("/model/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const vehicules = await prisma.models.findUnique({
    where: {
      id_model: id,
    },
  });
  res.json(vehicules);
});
vehiculesRouter.get("/model/brand/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const vehicules = await prisma.brand.findUnique({
    where: {
      id_brand: id,
    },
  });
  res.json(vehicules);
});
vehiculesRouter.get("/user/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const vehicules = await prisma.users.findUnique({
    where: {
      id_user: id,
    },
  });
  res.json(vehicules);
});

vehiculesRouter.post("/", async (req: Request, res: Response) => {
  const {
    immat,
    registration_date,
    model_id_model,
    user_id_user,
    types_id_type,
    url_vehiculeRegistration,
  } = req.body;
  const vehicules = await prisma.vehicules.create({
    data: {
      immat: immat,
      registration_date: registration_date,
      model_id_model: model_id_model,
      user_id_user: user_id_user,
      types_id_type: types_id_type,
      url_vehiculeRegistration: url_vehiculeRegistration,
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
