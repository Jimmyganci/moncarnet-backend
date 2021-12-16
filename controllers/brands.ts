import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const brandsRouter = require("express").Router();

const prisma = new PrismaClient();

// authorization:admin
brandsRouter.get("/", async (req: Request, res: Response) => {
  const brands = await prisma.brand.findMany();
  res.json(brands);
});

// Search a vehicule by id
brandsRouter.get("/:id", async (req: Request, res: Response) =>  {
  const id: number = parseInt(req.params.id);
const brandsById = await prisma.brand.findUnique({

  where: {
    id_brand: id,
  },
});
res.json(brandsById)
});

// search/obtain vehicules models for a specific brand
brandsRouter.get("/brand/models", async (req: Request, res: Response) => {
  const models = (req.query.models)
  const brands = await prisma.brand.findMany({
    

  },

  );
  res.json(models);
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

// brands.ts : "get({filters: name})", "get:id", "get/brand/models", "get/brand/vehicules", "get/brand/users", post, put, delete
