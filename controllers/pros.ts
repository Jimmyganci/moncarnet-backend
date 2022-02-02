import { Request, Response, NextFunction, Router } from "express";
import prisma from "../helpers/prisma";
import bodyValidator from "../middleware/bodyValidator";
import { postPros, putPros } from "../JOI/validate";
import UserAuth from "../helpers/users";
import ProsInfos from "../interfaces/IProsInfos";
import upload from "../middleware/fileUpload";
import checktoken from "../middleware/checkToken";

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
const prosRouter = Router();

// authorization : admin, user
prosRouter.get(
  "/",
  checktoken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { namePros, city } = req.query;
    try {
      if (req.query.namePros && !req.query.city) {
        const nameFilter = await prisma.pros.findMany({
          where: {
            name: {
              contains: String(namePros),
            },
          },
        });
        res.status(200).json(nameFilter);
      } else if (req.query.city && !req.query.namePros) {
        const prosByCity = await prisma.pros.findMany({
          where: {
            city: { contains: String(city) },
          },
        });
        res.status(200).json(prosByCity);
      } else if (req.query.namePros && req.query.city) {
        const prosByNameAndCity = await prisma.pros.findMany({
          where: {
            OR: {
              name: {
                contains: String(namePros),
              },
              city: {
                contains: String(city),
              },
            },
          },
        });
        res.status(200).json(prosByNameAndCity);
      } else {
        const pros = await prisma.pros.findMany();
        res.status(200).json(pros);
      }
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
// authorization : admin, user, pros
prosRouter.get(
  "/:idPros",
  checktoken,
  async (req: Request, res: Response, next: NextFunction) => {
    const idPros = parseInt(req.params.idPros);
    try {
      const getOnePros = await prisma.pros.findUnique({
        where: {
          id_pros: idPros,
        },
        rejectOnNotFound: true,
      });
      res.status(200).json(getOnePros);
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
prosRouter.get(
  "/:idPros/users",
  checktoken,
  async (req: Request, res: Response, next: NextFunction) => {
    const idPros = parseInt(req.params.idPros);
    try {
      const usersPros = await prisma.users.findMany({
        where: {
          pros: {
            some: {
              id_pros: idPros,
            },
          },
        },
      });
      res.status(200).json(usersPros);
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
prosRouter.get(
  "/:idConnected/appointments",
  async (req: Request, res: Response, next: NextFunction) => {
    const { idConnected } = req.params;
    try {
      const getOneAppointment = await prisma.appointments.findMany({
        where: {
          prosId: Number(idConnected),
        },
      });
      res.status(200).json(getOneAppointment);
    } catch (err) {
      next(err);
    }
  }
);

prosRouter.post("/upload", checktoken, upload);

// authorization : admin only
prosRouter.post(
  "/",
  bodyValidator(postPros),
  async (req: Request, res: Response, next: NextFunction) => {
    const pros: ProsInfos = req.body;
    try {
      const emailExisting = await prisma.pros.findUnique({
        where: {
          email: pros.email,
        },
      });
      if (!emailExisting) {
        const hashedPassword = await UserAuth.hashPassword(pros.password);
        const createPros = await prisma.pros.create({
          data: {
            name: pros.name,
            email: pros.email,
            hashedPassword: hashedPassword,
            address: pros.address,
            phone: pros.phone,
            postal_code: pros.postal_code,
            city: pros.city,
            siret: pros.siret,
          },
        });
        res.status(200).json(createPros);
      } else {
        res.status(409).send("Email already used");
      }
    } catch (err) {
      next(err);
    }
  }
);
// authorization : admin pros
prosRouter.put(
  "/:idPros",
  checktoken,
  bodyValidator(putPros),
  async (req: Request, res: Response, next: NextFunction) => {
    const idPros = parseInt(req.params.idPros);
    const pros: ProsInfos = req.body;
    try {
      const emailExisting = await prisma.pros.findMany({
        where: {
          email: pros.email,
          NOT: {
            id_pros: idPros,
          },
        },
      });
      if (emailExisting.length === 0) {
        // const hashedPassword = await UserAuth.hashPassword(pros.password);
        const prosUpdate = await prisma.pros.update({
          where: {
            id_pros: idPros,
          },
          data: {
            name: pros.name,
            email: pros.email,
            // hashedPassword: hashedPassword,
            address: pros.address,
            phone: pros.phone,
            postal_code: pros.postal_code,
            city: pros.city,
            siret: pros.siret,
          },
        });
        res.status(200).json(prosUpdate);
      } else {
        res.status(409).send("Email already used");
      }
    } catch (err) {
      next(err);
    }
  }
);
// authorization : admin
prosRouter.delete(
  "/:idPros",
  checktoken,
  async (req: Request, res: Response, next: NextFunction) => {
    const idPros = parseInt(req.params.idPros);
    try {
      const prosDelete = await prisma.pros.delete({
        where: {
          id_pros: idPros,
        },
      });
      res.status(200).json(prosDelete).send("User deleted!");
    } catch (err) {
      next(err);
    }
  }
);

module.exports = prosRouter;
