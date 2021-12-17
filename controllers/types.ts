import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const typesRouter = require("express").Router();

const prisma = new PrismaClient();

typesRouter.get("/all", async (req: Request, res: Response) => {
  const { name } = req.query;
  if (req.query.name) {
    try {
      const nameFilter = await prisma.types.findMany({
        where: {
          name_type: {
            contains: String(name),
          },
        },
      });
      res.status(200).send(nameFilter);
    } catch (err) {
      res.status(404).send(err);
    }
  }

  try {
    const types = await prisma.types.findMany();
    res.status(200).send(types);
  } catch (err) {
    res.status(404).send(err);
  }
});
typesRouter.get("/:idType", async (req: Request, res: Response) => {
  const { idType } = req.params;
  try {
    const type = await prisma.types.findUnique({
      where: {
        id_type: Number(idType),
      },
    });
    res.status(200).send(type);
  } catch (err) {
    res.status(404).send(err);
  }
});

typesRouter.get("/vehicules/:idType", async (req: Request, res: Response) => {
  const { idType } = req.params;
  try {
    const findVehiculeByType = await prisma.vehicules.findMany({
      where: {
        types: {
          id_type: Number(idType),
        },
      },
    });
    res.status(200).send(findVehiculeByType);
  } catch (err) {
    res.status(404).send(err);
  }
});

typesRouter.post("/", async (req: Request, res: Response) => {
  const { name_type }: { name_type: string } = req.body;
  const existingType = await prisma.types.findUnique({
    where: {
      name_type: name_type,
    },
  });
  if (!existingType) {
    try {
      const createTypes = await prisma.types.create({
        data: {
          name_type: name_type,
        },
      });
      res.status(200).json(createTypes);
    } catch (err) {
      res.status(404).send("error " + err);
    }
  } else {
    res.status(202).send("already used in the database");
  }
});

typesRouter.put("/:idType", async (req: Request, res: Response) => {
  const { idType } = req.params;
  const { name_type }: { name_type: string } = req.body;
  try {
    const updateTypes = await prisma.types.update({
      where: {
        id_type: Number(idType),
      },
      data: {
        name_type: name_type,
      },
    });
    res.status(200).json(updateTypes);
  } catch (err) {
    res.status(404).send(err);
  }
});
typesRouter.delete("/:idType", async (req: Request, res: Response) => {
  const { idType } = req.params;
  try {
    const deleteType = await prisma.types.delete({
      where: {
        id_type: Number(idType),
      },
    });
    res.status(200).json(deleteType.name_type + " deleted");
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = typesRouter;
