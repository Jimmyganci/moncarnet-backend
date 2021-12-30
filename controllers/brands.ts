import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const brandsRouter = require("express").Router();

const prisma = new PrismaClient();

// authorization:admin user
brandsRouter.get("/", async (req: Request, res: Response) => {
  const { name } = req.query;
  if (req.query.name) {
    try {
      const brandByName = await prisma.brand.findMany({
        where: {
          name: {
            contains: String(name),
          },
        },
      });
      res.status(200).json(brandByName);
    } catch (err) {
      res.status(404).send(err);
    }
  } else {
    const brands = await prisma.brand.findMany();
    res.status(200).json(brands);
  }
});

// Search a vehicule by id
brandsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const brandsById = await prisma.brand.findUnique({
    where: {
      id_brand: id,
    },
  });
  res.json(brandsById);
});

// search/obtain  models for a specific brand
brandsRouter.get("/:idbrand/models", async (req: Request, res: Response) => {
  const idBrand = parseInt(req.params.idbrand);
  const findModelsByBrand = await prisma.models.findMany({
    where: {
      id_brand: idBrand,
    },
  });

  res.status(200).json(findModelsByBrand);
});

// search/obtain  vehicules for a specific brand (for pros)search/obtain  vehicules for a specific brand (for pros)
brandsRouter.get("/vehicules/:idbrand", async (req: Request, res: Response) => {
  const idBrand = req.params.idbrand;
  const vehiculeByBrand = await prisma.vehicules.findMany({
    where: {
      model: {
        brand: {
          id_brand: Number(idBrand),
        },
      },
    },
  });
  res.status(200).json(vehiculeByBrand);
});

// serach/obtain users by brand

brandsRouter.get("/:idbrand/users", async (req: Request, res: Response) => {
  const idBrand = req.params.idbrand;
  const usersByBrand = await prisma.users.findMany({
    where: {
      vehicules: {
        some: {
          model: {
            brand: {
              id_brand: Number(idBrand),
            },
          },
        },
      },
    },
  });
  res.status(200).json(usersByBrand);
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
  res.send(`${brandDeleted.name} deleted`);
});

module.exports = brandsRouter;

// brands.ts : "get({filters: name})", "get:id", "get/brand/models", "get/vehicules/:idbrand", "get/:idbrand/users", post, put, delete
