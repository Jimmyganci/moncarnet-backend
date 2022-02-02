import { Request, Response, NextFunction, Router } from "express";
import prisma from "../helpers/prisma";
import bodyValidator from "../middleware/bodyValidator";
import { postType } from "../JOI/validate";

const typesRouter = Router();

// just admin

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/

typesRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.query;
    try {
      if (req.query.name) {
        const nameFilter = await prisma.types.findMany({
          where: {
            name_type: {
              contains: String(name),
            },
          },
        });
        res.status(200).send(nameFilter);
      } else {
        const types = await prisma.types.findMany();
        res.status(200).send(types);
      }
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
typesRouter.get(
  "/:idType",
  async (req: Request, res: Response, next: NextFunction) => {
    const { idType } = req.params;
    try {
      const type = await prisma.types.findUnique({
        where: {
          id_type: Number(idType),
        },
      });
      res.status(200).send(type);
    } catch (err) {
      next(err);
    }
  }
);

/*//////////////////////////////////////////////////////////////
                        ROUTE IS USED
/////////////////////////////////////////////////////////////*/
typesRouter.post(
  "/",
  bodyValidator(postType),
  async (req: Request, res: Response, next: NextFunction) => {
    const { name_type }: { name_type: string } = req.body;
    try {
      const existingType = await prisma.types.findUnique({
        where: {
          name_type: name_type,
        },
      });
      if (!existingType) {
        const createTypes = await prisma.types.create({
          data: {
            name_type: name_type,
          },
        });
        res.status(200).json(createTypes);
      } else {
        res.status(202).send("already used in the database");
      }
    } catch (err) {
      next(err);
    }
  }
);

typesRouter.put(
  "/:idType",
  async (req: Request, res: Response, next: NextFunction) => {
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
      next(err);
    }
  }
);
typesRouter.delete(
  "/:idType",
  async (req: Request, res: Response, next: NextFunction) => {
    const { idType } = req.params;
    try {
      const deleteType = await prisma.types.delete({
        where: {
          id_type: Number(idType),
        },
      });
      res.status(200).json(deleteType.name_type + " deleted");
    } catch (err) {
      next(err);
    }
  }
);

export default typesRouter;
