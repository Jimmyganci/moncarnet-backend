import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bodyValidator from "../middleware/bodyValidator";
const { postUser } = require("../JOI/validate");
const usersRouter = require("express").Router();
const UserAuth = require("../helpers/users");
import IUserInfos from "../interfaces/IuserInfos";
import checktoken from "../middleware/checkToken";
import checkRole from "../middleware/checkRole";
import upload from "../middleware/fileUpload";

const prisma = new PrismaClient();

// authorization : admin
usersRouter.get(
  "/all",
  checktoken,
  checkRole,
  async (req: Request, res: Response) => {
    const { lastname, city, postal_code } = req.query;
    if (req.query.lastname) {
      try {
        const usersFilterByLastname = await prisma.users.findMany({
          where: {
            lastname: {
              contains: String(lastname),
            },
          },
        });
        res.status(200).json(usersFilterByLastname);
      } catch (err) {
        res.status(404).send(err);
      }
    } else if (req.query.postal_code) {
      try {
        const userFilterByPostal_code = await prisma.users.findMany({
          where: {
            postal_code: { in: Number(postal_code) },
          },
        });
        res.status(200).json(userFilterByPostal_code);
      } catch (err) {
        res.status(404).send(err);
      }
    } else if (req.query.city) {
      try {
        const userFilterByCity = await prisma.users.findMany({
          where: {
            city: {
              contains: String(city),
            },
          },
        });
        res.status(200).json(userFilterByCity);
      } catch (err) {
        res.status(404).send(err);
      }
    } else {
      try {
        const allUsers = await prisma.users.findMany();
        res.status(200).json(allUsers);
      } catch (err) {
        res.status(404).send(err);
      }
    }
  }
);
// authorizations: user, admin, pros
usersRouter.get("/:idUser", checktoken, async (req: Request, res: Response) => {
  const idUser = parseInt(req.params.idUser);
  try {
    const user = await prisma.users.findUnique({
      where: {
        id_user: idUser,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).send(err);
  }
});
//  authorizations : admin user
usersRouter.get(
  "/vehicules/:idUser",
  checktoken,
  async (req: Request, res: Response) => {
    const idUser = parseInt(req.params.idUser);
    try {
      const vehiculeUser = await prisma.vehicules.findMany({
        where: {
          user: {
            id_user: idUser,
          },
        },
      });
      res.status(200).json(vehiculeUser);
    } catch (err) {
      res.status(404).send(err);
    }
  }
);
// authorization: admin, user
usersRouter.get(
  "/pros/:idUser",
  checktoken,
  async (req: Request, res: Response) => {
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
      res.status(404).send(err);
    }
  }
);

usersRouter.put(
  "/pros/:idUser",
  checktoken,
  async (req: Request, res: Response) => {
    const { idUser } = req.params;
    const { idPros }: { idPros: number } = req.body;
    try {
      const createProsAndUsers = await prisma.users.update({
        where: {
          id_user: Number(idUser),
        },
        data: {
          pros: {
            connect: { id_pros: idPros },
          },
        },
      });
      res.status(200).json(createProsAndUsers);
    } catch (err) {
      res.status(404).send(err);
    }
  }
);

usersRouter.post("/upload", upload);

// authorization: admin, user
usersRouter.post(
  "/",
  bodyValidator(postUser),
  async (req: Request, res: Response) => {
    const user: IUserInfos = req.body;

    const emailExisting = await prisma.users.findUnique({
      where: {
        email: user.email,
      },
    });

    if (emailExisting === null) {
      try {
        const hashedPassword = await UserAuth.hashPassword(user.password);
        const createUser = await prisma.users.create({
          data: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            hashedPassword: hashedPassword,
            address: user.address,
            phone: user.phone,
            postal_code: user.postal_code,
            city: user.city,
          },
        });
        res.status(200).json(createUser);
      } catch (err) {
        res.status(404).send(err);
      }
    } else {
      res.status(409).send("Email already used");
    }
  }
);
// authorization: admin, user
usersRouter.put(
  "/:idUser",
  bodyValidator(postUser),
  checktoken,
  async (req: Request, res: Response) => {
    const idUser = parseInt(req.params.idUser);
    const user: IUserInfos = req.body;

    const emailExisting = await prisma.users.findMany({
      where: {
        email: user.email,
        NOT: {
          id_user: idUser,
        },
      },
    });

    if (emailExisting.length === 0) {
      try {
        const hashedPassword = await UserAuth.hashPassword(user.password);
        const userUpdate = await prisma.users.update({
          where: {
            id_user: idUser,
          },
          data: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            hashedPassword: hashedPassword,
            address: user.address,
            phone: user.phone,
            postal_code: user.postal_code,
            city: user.city,
          },
        });
        res.status(200).json(userUpdate);
      } catch (err) {
        res.status(404).send(err);
      }
    } else {
      res.status(409).send("Email already used!");
    }
  }
);
// authorization: admin, user
usersRouter.delete(
  "/:idUser",
  checktoken,
  async (req: Request, res: Response) => {
    const idUser: number = parseInt(req.params.idUser);
    try {
      const userDelete = await prisma.users.delete({
        where: {
          id_user: idUser,
        },
      });
      res.status(200).send(userDelete.firstname + " deleted");
    } catch (err) {
      res.status(404).send(err);
    }
  }
);

module.exports = usersRouter;
