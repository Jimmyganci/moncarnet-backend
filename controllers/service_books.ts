import { Request, Response, NextFunction, Router } from "express";
import prisma from "../helpers/prisma";
import bodyValidator from "../middleware/bodyValidator";
import { postServiceBook } from "../JOI/validate";
import ServiceBookInfos from "../interfaces/IServiceBook";
import upload from "../middleware/fileUpload";

const service_bookRouter = Router();

service_bookRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceBooks = await prisma.service_books.findMany();
      res.status(200).json(serviceBooks);
    } catch (err) {
      next(err);
    }
  }
);

service_bookRouter.get(
  "/:idServiceBook",
  async (req: Request, res: Response, next: NextFunction) => {
    const { idServiceBook } = req.params;
    try {
      const getOneServiceBook = await prisma.service_books.findUnique({
        where: {
          id_service_book: Number(idServiceBook),
        },
      });
      res.status(200).json(getOneServiceBook);
    } catch (err) {
      next(err);
    }
  }
);

service_bookRouter.post("/upload", upload);

service_bookRouter.post(
  "/",
  bodyValidator(postServiceBook),
  async (req: Request, res: Response, next: NextFunction) => {
    const pros: ServiceBookInfos = req.body;
    try {
      const addServiceBook = await prisma.service_books.create({
        data: {
          date: new Date(pros.date),
          service: pros.service,
          observations: pros.observations,
          kilometrage: pros.kilometrage,
          url_invoice: pros.url_invoice,
          pros: {
            connect: {
              id_pros: pros.id_pros,
            },
          },
          vehicules: {
            connect: {
              immat: pros.immat_vehicule,
            },
          },
        },
      });
      res.status(200).json(addServiceBook);
    } catch (err) {
      next(err);
    }
  }
);
service_bookRouter.put(
  "/:idServiceBook",
  async (req: Request, res: Response, next: NextFunction) => {
    const idServiceBook = parseInt(req.params.idServiceBook);
    const pros: ServiceBookInfos = req.body;
    try {
      const userUpdate = await prisma.service_books.update({
        where: {
          id_service_book: idServiceBook,
        },
        data: {
          date: new Date(pros.date),
          service: pros.service,
          observations: pros.observations,
          kilometrage: pros.kilometrage,
          url_invoice: pros.url_invoice,
        },
      });
      res.status(200).json(userUpdate);
    } catch (err) {
      next(err);
    }
  }
);

service_bookRouter.delete(
  "/:idServiceBook",
  async (req: Request, res: Response, next: NextFunction) => {
    const idServiceBook = parseInt(req.params.idServiceBook);
    try {
      const deleteService_book = await prisma.service_books.delete({
        where: {
          id_service_book: idServiceBook,
        },
      });
      res
        .status(200)
        .send(
          `Sercie Book with id ${deleteService_book.id_service_book} deleted`
        );
    } catch (err) {
      next(err);
    }
  }
);

module.exports = service_bookRouter;
