import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const vehiculesRouter = require("express").Router();

const prisma = new PrismaClient();

interface VehiculeInfos {
  immat: string;
  registration_date: Date;
  model_id_model: number;
  user_id_user: number;
  types_id_type: number;
  url_vehiculeRegistration: string;
}

// get many vehicules (authorization: admin)
vehiculesRouter.get("/all", async (req: Request, res: Response) => {
  const vehicules = await prisma.vehicules.findMany();
  res.json(vehicules);
});
// get one vehicule (authorization: all)
vehiculesRouter.get("/:id", async (req: Request, res: Response) => {
  const immat = String(req.params.id);
  const vehicules = await prisma.vehicules.findUnique({
    where: {
      immat: immat,
    },
  });
  res.json(vehicules);
});
// get model's vehicule (authorization: all)
vehiculesRouter.get("/model/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const vehicules = await prisma.models.findUnique({
    where: {
      id_model: id,
    },
  });
  res.json(vehicules);
});
// get brand vehicule (authorization: all)
vehiculesRouter.get("/model/:id/brand", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const vehicules = await prisma.models.findUnique({
    where: {
      id_model: id,
    },
    select: {
      brand: {
        select: {
          name: true,
        },
      },
    },
  });
  res.json(vehicules);
});
// get user's vehicule (authorization: pros, admin)
vehiculesRouter.get("/user/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const vehicules = await prisma.users.findUnique({
    where: {
      id_user: id,
    },
  });
  res.json(vehicules);
});
// post vehicule (authorization: user, admin)
vehiculesRouter.post("/", async (req: Request, res: Response) => {
  const vehicule: VehiculeInfos = req.body;
  const vehicules = await prisma.vehicules.create({
    data: {
      immat: vehicule.immat,
      registration_date: vehicule.registration_date,
      model_id_model: vehicule.model_id_model,
      user_id_user: vehicule.user_id_user,
      types_id_type: vehicule.types_id_type,
      url_vehiculeRegistration: vehicule.url_vehiculeRegistration,
    },
  });
  res.json(vehicules);
});
// update vehicule (authorization: user, admin)
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
// delete vehicule (authorization: user, admin)
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
