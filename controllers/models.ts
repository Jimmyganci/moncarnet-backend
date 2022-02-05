import { Request, Response, NextFunction, Router } from "express";
import prisma from "../helpers/prisma";

const modelsRouter = Router();

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
modelsRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const models = await prisma.models.findMany();
      res.status(200).json(models);
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
modelsRouter.get(
  "/:idModel",
  async (req: Request, res: Response, next: NextFunction) => {
    const idModel = parseInt(req.params.idModel);
    try {
      const models = await prisma.models.findUnique({
        where: {
          id_model: idModel,
        },
      });
      res.status(200).json(models);
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
modelsRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addModels = await prisma.models.create({
        data: {
          code: req.body.code,
          name: req.body.name,
          id_brand: req.body.id_brand,
        },
      });
      res.status(200).json(addModels);
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
modelsRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id);
    try {
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
      res.status(200).json(modelUpdate);
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/

modelsRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id);
    try {
      const modelDeleted = await prisma.models.delete({
        where: {
          id_model: id,
        },
      });
      res.status(200).send(`${modelDeleted.name} deleted`);
    } catch (err) {
      next(err);
    }
  }
);

export default modelsRouter;
