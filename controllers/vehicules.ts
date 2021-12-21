import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bodyValidator from "../middleware/bodyValidator";
const { postVehicule } = require("../JOI/validate");
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
  const { brand, model } = req.query;
  if (req.query.brand) {
    try {
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
    } catch (err) {
      res.status(404).send(err);
    }
  } else if (req.query.model) {
    try {
      const vehiculeByModel = await prisma.vehicules.findMany({
        where: {
          models: {
            name: { contains: String(model) },
          },
        },
      });
      res.status(200).json(vehiculeByModel);
    } catch (err) {
      res.status(404).send(err);
    }
  } else {
    const vehicules = await prisma.vehicules.findMany();
    res.json(vehicules);
  }
});
// get one vehicule (authorization: all)
vehiculesRouter.get("/:immat", async (req: Request, res: Response) => {
  const immat = String(req.params.immat);
  const vehicules = await prisma.vehicules.findUnique({
    where: {
      immat: immat,
    },
  });
  res.json(vehicules);
});
// get model's vehicule (authorization: all)
vehiculesRouter.get("/model/:idModel", async (req: Request, res: Response) => {
  const idModel = parseInt(req.params.idModel);
  const vehicules = await prisma.models.findUnique({
    where: {
      id_model: idModel,
    },
  });
  res.json(vehicules);
});
// get brand vehicule (authorization: all)
vehiculesRouter.get(
  "/model/:idModel/brand",
  async (req: Request, res: Response) => {
    const idModel = parseInt(req.params.idModel);
    const vehicules = await prisma.models.findUnique({
      where: {
        id_model: idModel,
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
  }
);
// get user's vehicule (authorization: pros, admin)
vehiculesRouter.get("/user/:idUser", async (req: Request, res: Response) => {
  const idUser = parseInt(req.params.idUser);
  const vehicules = await prisma.users.findUnique({
    where: {
      id_user: idUser,
    },
  });
  res.json(vehicules);
});
// post vehicule (authorization: user, admin)
vehiculesRouter.post(
  "/",
  bodyValidator(postVehicule),
  async (req: Request, res: Response) => {
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
  }
);
// update vehicule (authorization: user, admin)
vehiculesRouter.put("/:immat", async (req: Request, res: Response) => {
  const immat: string = req.params.immat;

  const vehiculeUpdate = await prisma.vehicules.update({
    where: {
      immat: immat,
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
vehiculesRouter.delete("/;immat", async (req: Request, res: Response) => {
  const immat: string = req.params.immat;
  const vehiculeDeleted = await prisma.vehicules.delete({
    where: {
      immat: immat,
    },
  });
  res.json(vehiculeDeleted);
});

module.exports = vehiculesRouter;
