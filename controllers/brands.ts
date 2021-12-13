import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const brandsRouter = require("express").Router();

const prisma = new PrismaClient();

brandsRouter.get("/", async (req: Request, res: Response) => {
  const brands = await prisma.brand.findMany();
  res.json(brands);
});
brandsRouter.post("/", async (req: Request, res: Response) => {
  const addBrands = await prisma.brand.create({
    data: {
      code: req.body.code,
      name: req.body.name,
    },
  });
  res.json(addBrands);
});
brandsRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const brandUpdate = await prisma.brand.update({
    where: {
      id_brand: id,
    },
    data: {
      code: req.body.code,
      name: req.body.name,
    },
  });
  res.json(brandUpdate);
});

brandsRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const brandDeleted = await prisma.brand.delete({
    where: {
      id_brand: id,
    },
  });
  res.send("brand Deleted");
});

module.exports = brandsRouter;
