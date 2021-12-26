import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bodyValidator from "../middleware/bodyValidator";
const { postVehicule } = require("../JOI/validate");
const vehiculesRouter = require("express").Router();
import VehiculeInfos from "../interfaces/IVehiculeInfos";
import upload from "../middleware/fileUpload";

const prisma = new PrismaClient();

// get many vehicules (authorization: admin)
vehiculesRouter.get("/all", async (req: Request, res: Response) => {
  const { brand, model } = req.query;
  if (req.query.brand) {
    try {
      const vehiculeByBrand = await prisma.vehicules.findMany({
        where: {
          model: {
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
          model: {
            name: {
              contains: String(model),
            },
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

vehiculesRouter.post("/upload", upload);
// post vehicule (authorization: user, admin)
vehiculesRouter.post(
  "/",
  bodyValidator(postVehicule),
  async (req: Request, res: Response) => {
    const vehicule: VehiculeInfos = req.body;
    const vehicules = await prisma.vehicules.create({
      data: {
        immat: vehicule.immat,
        registration_date: new Date(vehicule.registration_date).toISOString(),
        url_vehiculeRegistration: vehicule.url_vehiculeRegistration,
        model: {
          connect: {
            id_model: vehicule.id_modelId,
          },
        },
        type: {
          connect: {
            id_type: vehicule.id_typeId,
          },
        },
        user: {
          connect: {
            id_user: vehicule.id_userId,
          },
        },
      },
    });
    res.status(200).json(vehicules);
  }
);
// update vehicule (authorization: user, admin)
vehiculesRouter.put("/:immat", async (req: Request, res: Response) => {
  const immat: string = req.params.immat;
  const vehicule: VehiculeInfos = req.body;
  const vehiculeUpdate = await prisma.vehicules.update({
    where: {
      immat: immat,
    },
    data: {
      immat: vehicule.immat,
      registration_date: new Date(vehicule.registration_date).toISOString(),
      url_vehiculeRegistration: vehicule.url_vehiculeRegistration,
      model: {
        connect: {
          id_model: vehicule.id_modelId,
        },
      },
      type: {
        connect: {
          id_type: vehicule.id_typeId,
        },
      },
      user: {
        connect: {
          id_user: vehicule.id_userId,
        },
      },
    },
  });
  res.json(vehiculeUpdate);
});
// delete vehicule (authorization: user, admin)
vehiculesRouter.delete("/:immat", async (req: Request, res: Response) => {
  const immat: string = req.params.immat;
  try {
    const vehiculeDeleted = await prisma.vehicules.delete({
      where: {
        immat: immat,
      },
    });
    res.status(200).send(`${vehiculeDeleted.immat} deleted`);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = vehiculesRouter;
