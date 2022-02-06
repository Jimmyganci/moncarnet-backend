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
        const findTypeByName = await prisma.types.findMany({
          where: {
            name_type: {
              contains: String(name),
            },
          },
        });
        res.status(200).send(findTypeByName);
      } else {
        const getAllTypes = await prisma.types.findMany();
        res.status(200).send(getAllTypes);
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
      const getOneType = await prisma.types.findUnique({
        where: {
          id_type: Number(idType),
        },
      });
      res.status(200).send(getOneType);
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
        const createdType = await prisma.types.create({
          data: {
            name_type: name_type,
          },
        });
        res.status(200).json(createdType);
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
      const updatedType = await prisma.types.update({
        where: {
          id_type: Number(idType),
        },
        data: {
          name_type: name_type,
        },
      });
      res.status(200).json(updatedType);
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
      const deletedType = await prisma.types.delete({
        where: {
          id_type: Number(idType),
        },
      });
      res.status(200).json(deletedType.name_type + " deleted");
    } catch (err) {
      next(err);
    }
  }
);

export default typesRouter;
