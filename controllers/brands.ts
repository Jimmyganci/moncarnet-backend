import { Request, Response, NextFunction, Router } from "express";
import prisma from "../helpers/prisma";

const brandsRouter = Router();

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
// authorization:admin user
brandsRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.query;
    try {
      if (req.query.name) {
        const findBrandByName = await prisma.brands.findMany({
          where: {
            name: {
              contains: String(name),
            },
          },
        });
        res.status(200).json(findBrandByName);
      } else {
        const brands = await prisma.brands.findMany();
        res.status(200).json(brands);
      }
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
// Search one vehicule
brandsRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    try {
      const findBrandById = await prisma.brands.findUnique({
        where: {
          id_brand: id,
        },
      });
      res.json(findBrandById);
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

// serach/obtain users by brand

brandsRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdBrand = await prisma.brands.create({
        data: {
          code: req.body.code,
          name: req.body.name,
        },
      });
      res.json(createdBrand);
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
      const updatedBrand = await prisma.brands.update({
        where: {
          id_brand: id,
        },
        data: {
          code: req.body.code,
          name: req.body.name,
        },
      });
      res.json(updatedBrand);
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
      const deletedBrand = await prisma.brands.delete({
        where: {
          id_brand: id,
        },
      });
      res.send(`${deletedBrand.name} deleted`);
    } catch (err) {
      next(err);
    }
  }
);

export default brandsRouter;
