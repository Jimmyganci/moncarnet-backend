import { Request, Response, NextFunction } from "express";
import prisma from "../helpers/prisma";
import bodyValidator from "../middleware/bodyValidator";
import { postVehicule } from "../JOI/validate";
const vehiculesRouter = require("express").Router();
import VehiculeInfos from "../interfaces/IVehiculeInfos";
import upload from "../middleware/fileUpload";

// get many vehicules (authorization: admin)
vehiculesRouter.get(
  "/all",
  async (req: Request, res: Response, next: NextFunction) => {
    const { brand, model, validate, noValidate } = req.query;
    try {
      if (req.query.brand) {
        const vehiculeByBrand = await prisma.vehicules.findMany({
          where: {
            models: {
              brand: {
                name: {
                  contains: String(brand),
                },
              },
            },
          },
        });
        res.status(200).json(vehiculeByBrand);
      } else if (req.query.model) {
        const vehiculeByModel = await prisma.vehicules.findMany({
          where: {
            models: {
              name: {
                contains: String(model),
              },
            },
          },
        });
        res.status(200).json(vehiculeByModel);
      } else if (validate) {
        const vehiculeByValidate = await prisma.vehicules.findMany({
          where: {
            validate: {
              equals: true,
            },
          },
        });
        res.status(200).json(vehiculeByValidate);
      } else if (noValidate) {
        const vehiculeByValidate = await prisma.vehicules.findMany({
          where: {
            validate: {
              equals: false,
            },
          },
        });
        res.status(200).json(vehiculeByValidate);
      } else {
        const vehicules = await prisma.vehicules.findMany();
        res.json(vehicules);
      }
    } catch (err) {
      next(err);
    }
  }
);

vehiculesRouter.get(
  "/withoutServiceBook",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getVehiculeWIthoutServiceBook =
        await prisma.$queryRaw`SELECT v.* FROM vehicules as v LEFT JOIN service_book as sb on v.immat = sb.immat WHERE sb.immat IS NULL`;
      res.status(200).json(getVehiculeWIthoutServiceBook);
    } catch (err) {
      next(err);
    }
  }
);
// get one vehicule (authorization: all)
vehiculesRouter.get(
  "/:immat",
  async (req: Request, res: Response, next: NextFunction) => {
    const immat = String(req.params.immat);
    try {
      const vehicules = await prisma.vehicules.findUnique({
        where: {
          immat: immat,
        },
      });
      res.status(200).json(vehicules);
    } catch (err) {
      next(err);
    }
  }
);
// get model's vehicule (authorization: all)
vehiculesRouter.get(
  "/:immat/model",
  async (req: Request, res: Response, next: NextFunction) => {
    const immat = req.params.immat;
    try {
      const vehicules = await prisma.vehicules.findUnique({
        where: {
          immat: String(immat),
        },
        select: {
          models: true,
        },
      });
      res.status(200).json(vehicules);
    } catch (err) {
      next(err);
    }
  }
);
// get brand's vehicule (authorization: all)
vehiculesRouter.get(
  "/:immat/brand",
  async (req: Request, res: Response, next: NextFunction) => {
    const immat = req.params.immat;
    try {
      const vehicules = await prisma.vehicules.findUnique({
        where: {
          immat: String(immat),
        },
        select: {
          models: {
            select: {
              brand: true,
            },
          },
        },
      });
      res.status(200).json(vehicules);
    } catch (err) {
      next(err);
    }
  }
);
vehiculesRouter.get(
  "/:immat/type",
  async (req: Request, res: Response, next: NextFunction) => {
    const immat = req.params.immat;
    try {
      const vehicules = await prisma.vehicules.findUnique({
        where: {
          immat: String(immat),
        },
        select: {
          types: true,
        },
      });
      res.status(200).json(vehicules);
    } catch (err) {
      next(err);
    }
  }
);
// get user's vehicule (authorization: pros, admin)
vehiculesRouter.get(
  "/user/:idUser",
  async (req: Request, res: Response, next: NextFunction) => {
    const idUser = parseInt(req.params.idUser);
    try {
      const vehicules = await prisma.users.findUnique({
        where: {
          id_user: idUser,
        },
      });
      res.status(200).json(vehicules);
    } catch (err) {
      next(err);
    }
  }
);

vehiculesRouter.post("/upload", upload);
// post vehicule (authorization: user, admin)
vehiculesRouter.post(
  "/",
  bodyValidator(postVehicule),
  async (req: Request, res: Response, next: NextFunction) => {
    const vehicule: VehiculeInfos = req.body;
    try {
      const vehicules = await prisma.vehicules.create({
        data: {
          immat: vehicule.immat,
          registration_date: new Date(vehicule.registration_date).toISOString(),
          url_vehiculeRegistration: vehicule.url_vehiculeRegistration,
          validate: vehicule.validate,
          active: vehicule.active,
          models: {
            connect: {
              id_model: vehicule.id_modelId,
            },
          },
          types: {
            connect: {
              id_type: vehicule.id_typeId,
            },
          },
          users: {
            connect: {
              id_user: vehicule.id_userId,
            },
          },
        },
      });
      res.status(200).json(vehicules);
    } catch (err) {
      next(err);
    }
  }
);
// update vehicule (authorization: user, admin)
vehiculesRouter.put(
  "/:immat",
  bodyValidator(postVehicule),
  async (req: Request, res: Response, next: NextFunction) => {
    const immat: string = req.params.immat;
    const vehicule: VehiculeInfos = req.body;
    try {
      const vehiculeUpdate = await prisma.vehicules.update({
        where: {
          immat: immat,
        },
        data: {
          immat: vehicule.immat,
          registration_date: new Date(vehicule.registration_date).toISOString(),
          url_vehiculeRegistration: vehicule.url_vehiculeRegistration,
          validate: vehicule.validate,
          active: vehicule.active,
          models: {
            connect: {
              id_model: vehicule.id_modelId,
            },
          },
          types: {
            connect: {
              id_type: vehicule.id_typeId,
            },
          },
          users: {
            connect: {
              id_user: vehicule.id_userId,
            },
          },
        },
      });
      res.status(204).json(vehiculeUpdate.immat);
    } catch (err) {
      next(err);
    }
  }
);
// delete vehicule (authorization: user, admin)
vehiculesRouter.delete(
  "/:immat",
  async (req: Request, res: Response, next: NextFunction) => {
    const immat: string = req.params.immat;
    try {
      const vehiculeDeleted = await prisma.vehicules.delete({
        where: {
          immat: immat,
        },
      });
      res.status(200).send(`${vehiculeDeleted.immat} deleted`);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = vehiculesRouter;
