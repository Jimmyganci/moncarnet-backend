import { Request, Response, NextFunction } from "express";
import prisma from "../helpers/prisma";
const brandsRouter = require("express").Router();

// authorization:admin user
brandsRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.query;
    try {
      if (req.query.name) {
        const brandByName = await prisma.brand.findMany({
          where: {
            name: {
              contains: String(name),
            },
          },
        });
        res.status(200).json(brandByName);
      } else {
        const brands = await prisma.brand.findMany();
        res.status(200).json(brands);
      }
    } catch (err) {
      next(err);
    }
  }
);

// Search one vehicule
brandsRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    try {
      const brandsById = await prisma.brand.findUnique({
        where: {
          id_brand: id,
        },
      });
      res.json(brandsById);
    } catch (err) {
      next(err);
    }
  }
);

// search/obtain  models for a specific brand
brandsRouter.get(
  "/:idbrand/models",
  async (req: Request, res: Response, next: NextFunction) => {
    const idBrand = parseInt(req.params.idbrand);
    try {
      const findModelsByBrand = await prisma.models.findMany({
        where: {
          id_brand: idBrand,
        },
      });
      res.status(200).json(findModelsByBrand);
    } catch (err) {
      next(err);
    }
  }
);

// search/obtain  vehicules for a specific brand (for pros)search/obtain  vehicules for a specific brand (for pros)
brandsRouter.get(
  "/vehicules/:idbrand",
  async (req: Request, res: Response, next: NextFunction) => {
    const idBrand = req.params.idbrand;
    try {
      const vehiculeByBrand = await prisma.vehicules.findMany({
        where: {
          models: {
            brand: {
              id_brand: Number(idBrand),
            },
          },
        },
      });
      res.status(200).json(vehiculeByBrand);
    } catch (err) {
      next(err);
    }
  }
);

// serach/obtain users by brand

brandsRouter.get(
  "/:idbrand/users",
  async (req: Request, res: Response, next: NextFunction) => {
    const idBrand = req.params.idbrand;
    try {
      const usersByBrand = await prisma.users.findMany({
        where: {
          vehicules: {
            some: {
              models: {
                brand: {
                  id_brand: Number(idBrand),
                },
              },
            },
          },
        },
      });
      res.status(200).json(usersByBrand);
    } catch (err) {
      next(err);
    }
  }
);

brandsRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addBrands = await prisma.brand.create({
        data: {
          code: req.body.code,
          name: req.body.name,
        },
      });
      res.json(addBrands);
    } catch (err) {
      next(err);
    }
  }
);

brandsRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id);
    try {
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
    } catch (err) {
      next(err);
    }
  }
);

brandsRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id);
    try {
      const brandDeleted = await prisma.brand.delete({
        where: {
          id_brand: id,
        },
      });
      res.send(`${brandDeleted.name} deleted`);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = brandsRouter;
