import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const usersRouter = require("express").Router();
const UserAuth = require("../helpers/users");

const prisma = new PrismaClient();

interface UsersInfos {
  id_user: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  postal_code: number;
  city: string;
}

usersRouter.get("/all", async (req: Request, res: Response) => {
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
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const user = await prisma.users.findUnique({
      where: {
        id_user: id,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).send(err);
  }
});

usersRouter.get("/vehicules/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const vehiculeUser = await prisma.vehicules.findMany({
      where: {
        user_id_user: id,
      },
    });
    res.status(200).json(vehiculeUser);
  } catch (err) {
    res.status(404).send(err);
  }
});

usersRouter.get("/pros/:idUser", async (req: Request, res: Response) => {
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
});

usersRouter.post("/", async (req: Request, res: Response) => {
  const user: UsersInfos = req.body;

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
});

usersRouter.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user: UsersInfos = req.body;

  const emailExisting = await prisma.users.findMany({
    where: {
      email: user.email,
      NOT: {
        id_user: id,
      },
    },
  });
  try {
    if (emailExisting.length === 0) {
      const hashedPassword = await UserAuth.hashPassword(user.password);
      const userUpdate = await prisma.users.update({
        where: {
          id_user: id,
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
      res.json(userUpdate);
    }
  } catch (err) {
    res.send(err);
  }

  res.status(404).send("Email already used");
});

usersRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  try {
    const userDelete = await prisma.users.delete({
      where: {
        id_user: id,
      },
    });
    res.status(200).send(userDelete.firstname + " deleted");
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = usersRouter;
