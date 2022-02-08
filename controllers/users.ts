import { Request, Response, NextFunction, Router } from "express";
import prisma from "../helpers/prisma";
import bodyValidator from "../middleware/bodyValidator";
import { postUser, putUser } from "../JOI/validate";
import UserAuth from "../helpers/users";
import IUser from "../interfaces/IUser";
import checkToken from "../middleware/checkToken";

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
const usersRouter = Router();

// authorization : admin
usersRouter.get(
  "/",
  checkToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { lastname, city, postal_code } = req.query;
    if (req.query.appointments) {
      try {
        const usersWithoutAppointments = await prisma.users.findMany({
          where: {
            appointments: {
              none: {},
            },
          },
        });
        res.status(200).json(usersWithoutAppointments);
      } catch (err) {
        next(err);
      }
    } else if (req.query.lastname) {
      try {
        const findUsersByLastname = await prisma.users.findMany({
          where: {
            lastname: {
              contains: String(lastname),
            },
          },
        });
        res.status(200).json(findUsersByLastname);
      } catch (err) {
        next(err);
      }
    } else if (req.query.postal_code) {
      try {
        const findUserByPostalCode = await prisma.users.findMany({
          where: {
            postal_code: { in: Number(postal_code) },
          },
        });
        res.status(200).json(findUserByPostalCode);
      } catch (err) {
        next(err);
      }
    } else if (req.query.city) {
      try {
        const findUserByCity = await prisma.users.findMany({
          where: {
            city: {
              contains: String(city),
            },
          },
        });
        res.status(200).json(findUserByCity);
      } catch (err) {
        next(err);
      }
    } else {
      try {
        const getAllUsers = await prisma.users.findMany();
        res.status(200).json(getAllUsers);
      } catch (err) {
        next(err);
      }
    }
  }
);

// authorizations: user, admin, pros
usersRouter.get(
  "/:idUser",
  checkToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const idUser = parseInt(req.params.idUser);
    try {
      const getOneUser = await prisma.users.findUnique({
        where: {
          id_user: idUser,
        },
      });
      res.status(200).json(getOneUser);
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
// authorization: admin, user
usersRouter.get(
  "/:idUser/pros",
  checkToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const idUser = parseInt(req.params.idUser);
    try {
      const findProsByUser = await prisma.pros.findMany({
        where: {
          users: {
            some: {
              id_user: idUser,
            },
          },
        },
      });
      res.status(200).json(findProsByUser);
    } catch (err) {
      next(err);
    }
  }
);

usersRouter.get(
  "/:idUser/pros/:idPros",
  checkToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { idUser, idPros } = req.params;
    try {
      const getOneFavorite = await prisma.users.findUnique({
        where: {
          id_user: Number(idUser),
        },
        select: {
          pros: {
            where: {
              id_pros: Number(idPros),
            },
          },
        },
      });
      res.status(200).json(getOneFavorite?.pros[0]);
    } catch (err) {
      next(err);
    }
  }
);

usersRouter.put(
  "/:idUser/pros/:idPros",
  checkToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { idUser, idPros } = req.params;
    try {
      const existingFavorite = await prisma.users.findUnique({
        where: {
          id_user: Number(idUser),
        },
        select: {
          pros: {
            where: {
              id_pros: Number(idPros),
            },
          },
        },
      });
      if (existingFavorite && existingFavorite.pros.length === 0) {
        const createdProsToUsers = await prisma.users.update({
          where: {
            id_user: Number(idUser),
          },
          data: {
            pros: {
              connect: { id_pros: Number(idPros) },
            },
          },
        });
        res
          .status(204)
          .json(
            `${createdProsToUsers.firstname} the garage has been added on your favorite`
          );
      } else {
        res.status(409).send("This garage is already in your favorite!");
      }
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
usersRouter.get(
  "/:idUser/appointments",
  async (req: Request, res: Response, next: NextFunction) => {
    const { idUser } = req.params;
    try {
      const getOneAppointment = await prisma.appointments.findMany({
        where: {
          userId: Number(idUser),
          OR: {
            vehicules: {
              active: true,
              validate: true,
            },
          },
        },
      });
      res.status(200).json(getOneAppointment);
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
usersRouter.delete(
  "/:idUser/prosDeleted/:idPros",
  checkToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { idUser, idPros } = req.params;
    try {
      const deletedPros = await prisma.users.update({
        where: {
          id_user: Number(idUser),
        },
        data: {
          pros: {
            disconnect: {
              id_pros: Number(idPros),
            },
          },
        },
      });
      res
        .status(200)
        .send(
          `${deletedPros.firstname} the garage has been deleted of your favorite`
        );
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
// authorization: admin, user
usersRouter.post(
  "/",
  bodyValidator(postUser),
  async (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = req.body;
    try {
      const emailExisting = await prisma.users.findUnique({
        where: {
          email: user.email,
        },
      });

      if (emailExisting === null) {
        const hashedPassword = await UserAuth.hashPassword(user.password);
        const createdUser = await prisma.users.create({
          data: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            hashedPassword: hashedPassword,
            address: user.address,
            phone: user.phone,
            postal_code: user.postal_code,
            city: user.city,
            active: user.active,
          },
        });
        res.status(200).json(createdUser);
      } else {
        res.status(409).send("Email already used");
      }
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/

// authorization: admin, user
usersRouter.put(
  "/:idUser",
  bodyValidator(putUser),
  checkToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const idUser = parseInt(req.params.idUser);
    const user: IUser = req.body;
    try {
      const emailExisting = await prisma.users.findMany({
        where: {
          email: user.email,
          NOT: {
            id_user: idUser,
          },
        },
      });

      if (emailExisting.length === 0) {
        const updatedUser = await prisma.users.update({
          where: {
            id_user: idUser,
          },
          data: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            address: user.address,
            phone: user.phone,
            postal_code: user.postal_code,
            city: user.city,
            active: user.active,
          },
        });
        res.status(200).json(updatedUser);
      } else {
        res.status(409).send("Email already used!");
      }
    } catch (err) {
      next(err);
    }
  }
);

// authorization: admin, user
usersRouter.delete(
  "/:idUser",
  checkToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const idUser: number = parseInt(req.params.idUser);
    try {
      const deletedUser = await prisma.users.delete({
        where: {
          id_user: idUser,
        },
      });
      res.status(200).send(deletedUser.firstname + " deleted");
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
// get user's vehicule (authorization: pros, admin)
usersRouter.get(
  "/:idUser/vehicules",
  async (req: Request, res: Response, next: NextFunction) => {
    const idUser: number = parseInt(req.params.idUser);
    try {
      const vehicules = await prisma.vehicules.findMany({
        where: {
          users: {
            id_user: idUser,
          },
        },
      });
      res.status(200).json(vehicules);
    } catch (err) {
      next(err);
    }
  }
);

export default usersRouter;
