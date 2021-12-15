import { Request, response, Response } from "express";
import { PrismaClient } from "@prisma/client";
const modelsRouter = require("express").Router();

const prisma = new PrismaClient();

modelsRouter.get("/", async (req: Request, res: Response) => {
  const models = await prisma.models.findMany({
    select: {
      code: true,
      name: true,
      brand: true,
    },
  });
  res.json(models);
});

modelsRouter.post("/", async (req: Request, res: Response) => {
  const addModels = await prisma.models.create({
    data: {
      code: req.body.code,
      name: req.body.name,
      id_brand: req.body.id_brand,
    },
  });
  res.json(addModels);
});
modelsRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const modelUpdate = await prisma.models.update({
    where: {
      id_model: id,
    },
    data: {
      code: req.body.code,
      name: req.body.name,
      id_brand: req.body.id_brand,
    },
  });
  res.json(modelUpdate);
});

modelsRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const modelDeleted = await prisma.models.delete({
    where: {
      id_model: id,
    },
  });
  res.send("model Deleted");
});

module.exports = modelsRouter;
