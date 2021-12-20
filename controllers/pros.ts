import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bodyValidator from "../middleware/bodyValidator";
const { postPros } = require("../JOI/usersValidate");
const prosRouter = require("express").Router();
const UserAuth = require("../helpers/users");

const prisma = new PrismaClient();

interface ProsInfos {
  id_pros: number;
  name: string;
  email: string;
  password: string;
  adress: string;
  phone: string;
  postal_code: number;
  city: string;
  siret: number;
}
// authorization : admin, user
prosRouter.get("/", async (req: Request, res: Response) => {
  try {
    const pros = await prisma.pros.findMany();
    res.status(200).json(pros);
  } catch (err) {
    res.status(404).send(err);
  }
});
// authorization : admin, user, pros
prosRouter.get("/:idPros", async (req: Request, res: Response) => {
  const idPros = parseInt(req.params.idPros);
  try {
    const getOnePros = await prisma.pros.findUnique({
      where: {
        id_pros: idPros,
      },
    });
    res.status(200).json(getOnePros);
  } catch (err) {
    res.status(404).send(err);
  }
});
// authorization : admin, users
prosRouter.get("/users/:idPros", async (req: Request, res: Response) => {
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
    res.status(404).send(err);
  }
});

// authorization : admin only
prosRouter.post(
  "/",
  bodyValidator(postPros),
  async (req: Request, res: Response) => {
    const pros: ProsInfos = req.body;

    const emailExisting = await prisma.pros.findUnique({
      where: {
        email: pros.email,
      },
    });
    if (!emailExisting) {
      try {
        const hashedPassword = await UserAuth.hashPassword(pros.password);
        const createPros = await prisma.pros.create({
          data: {
            name: pros.name,
            email: pros.email,
            hashedPassword: hashedPassword,
            adress: pros.adress,
            phone: pros.phone,
            postal_code: pros.postal_code,
            city: pros.city,
            siret: pros.siret,
          },
        });
        res.status(200).json(createPros);
      } catch (err) {
        res.status(404).send(err);
      }
    } else {
      res.status(409).send("Email already used");
    }
  }
);
// authorization : admin pros
prosRouter.put("/:idPros", async (req: Request, res: Response) => {
  const idPros = parseInt(req.params.idPros);
  const pros: ProsInfos = req.body;

  const emailExisting = await prisma.pros.findMany({
    where: {
      email: pros.email,
      NOT: {
        id_pros: idPros,
      },
    },
  });
  if (emailExisting.length === 0) {
    try {
      const hashedPassword = await UserAuth.hashPassword(pros.password);
      const prosUpdate = await prisma.pros.update({
        where: {
          id_pros: idPros,
        },
        data: {
          name: pros.name,
          email: pros.email,
          hashedPassword: hashedPassword,
          adress: pros.adress,
          phone: pros.phone,
          postal_code: pros.postal_code,
          city: pros.city,
          siret: pros.siret,
        },
      });
      res.status(200).json(prosUpdate);
    } catch (err) {
      res.status(404).send(err);
    }
  } else {
    res.status(409).send("Email already used");
  }
});
// authorization : admin
prosRouter.delete("/:idPros", async (req: Request, res: Response) => {
  const idPros = parseInt(req.params.idPros);
  try {
    const prosDelete = await prisma.pros.delete({
      where: {
        id_pros: idPros,
      },
    });
    res.status(200).json(prosDelete).send("User deleted!");
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = prosRouter;
