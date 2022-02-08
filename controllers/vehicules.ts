import { Request, Response, NextFunction, Router } from "express";
import prisma from "../helpers/prisma";
import bodyValidator from "../middleware/bodyValidator";
import { postVehicule } from "../JOI/validate";
import IVehicule from "../interfaces/IVehicule";
import upload from "../middleware/fileUpload";

const vehiculesRouter = Router();

// get many vehicules (authorization: admin)
vehiculesRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const { noValidate } = req.query;
    try {
      if (noValidate) {
        const findVehiculeByValidate = await prisma.vehicules.findMany({
          where: {
            validate: {
              equals: false,
            },
          },
        });
        res.status(200).json(findVehiculeByValidate);
      } else if (req.query.service_book) {
        try {
          const findVehiculesWithoutServiceBook =
            await prisma.vehicules.findMany({
              where: {
                service_books: {
                  none: {},
                },
              },
            });
          res.status(200).json(findVehiculesWithoutServiceBook);
        } catch (err) {
          next(err);
        }
      } else {
        const getAllVehicules = await prisma.vehicules.findMany();
        res.json(getAllVehicules);
      }
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
      const getOneVehicule = await prisma.vehicules.findUnique({
        where: {
          immat: immat,
        },
      });
      res.status(200).json(getOneVehicule);
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
      const findModelVehicule = await prisma.vehicules.findUnique({
        where: {
          immat: String(immat),
        },
        select: {
          models: true,
        },
      });
      res.status(200).json(findModelVehicule);
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
      const findBrandVehicule = await prisma.vehicules.findUnique({
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
      res.status(200).json(findBrandVehicule);
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
      const findTypeVehicule = await prisma.vehicules.findUnique({
        where: {
          immat: String(immat),
        },
        select: {
          types: true,
        },
      });
      res.status(200).json(findTypeVehicule);
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
vehiculesRouter.get(
  "/:immat/service_book",
  async (req: Request, res: Response, next: NextFunction) => {
    const { immat } = req.params;
    try {
      const findServiceBookByVehicule = await prisma.service_books.findMany({
        where: {
          vehicules: {
            immat: immat,
          },
        },
      });
      res.status(200).json(findServiceBookByVehicule);
    } catch (err) {
      next(err);
    }
  }
);

vehiculesRouter.post("/:immat/upload", upload);
// post vehicule (authorization: user, admin)
vehiculesRouter.post(
  "/",
  bodyValidator(postVehicule),
  async (req: Request, res: Response, next: NextFunction) => {
    const vehicule: IVehicule = req.body;
    try {
      const createdVehicule = await prisma.vehicules.create({
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
      res.status(200).json(createdVehicule);
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
    const vehicule: IVehicule = req.body;
    try {
      const updatedVehicule = await prisma.vehicules.update({
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
      res.status(204).json(updatedVehicule.immat);
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
      const deletedVehicule = await prisma.vehicules.delete({
        where: {
          immat: immat,
        },
      });
      res.status(200).send(`${deletedVehicule.immat} deleted`);
    } catch (err) {
      next(err);
    }
  }
);

export default vehiculesRouter;
