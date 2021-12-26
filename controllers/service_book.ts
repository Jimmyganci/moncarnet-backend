import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bodyValidator from "../middleware/bodyValidator";
const { postServiceBook } = require("../JOI/validate");
const service_bookRouter = require("express").Router();
import ServiceBookInfos from "../interfaces/IServiceBook";
import upload from "../middleware/fileUpload";

const prisma = new PrismaClient();

service_bookRouter.get("/", async (req: Request, res: Response) => {
  const serviceBook = await prisma.service_Book.findMany();
  res.json(serviceBook);
});

service_bookRouter.post("/upload", upload);

service_bookRouter.post(
  "/",
  bodyValidator(postServiceBook),
  async (req: Request, res: Response) => {
    const pros: ServiceBookInfos = req.body;
    try {
      const addServiceBook = await prisma.service_Book.create({
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
          vehicule: {
            connect: {
              immat: pros.immat_vehicule,
            },
          },
        },
      });
      res.status(200).json(addServiceBook);
    } catch (err) {
      res.status(404).send(err);
    }
  }
);
service_bookRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const pros: ServiceBookInfos = req.body;
  const userUpdate = await prisma.service_Book.update({
    where: {
      id_service_book: id,
    },
    data: {
      date: pros.date,
      service: pros.service,
      observations: pros.observations,
      kilometrage: pros.kilometrage,
      url_invoice: pros.url_invoice,
    },
  });
  res.json(userUpdate);
});

service_bookRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const deleteService_book = await prisma.service_Book.delete({
    where: {
      id_service_book: id,
    },
  });
  res.send(`${deleteService_book} deleted`);
});

module.exports = service_bookRouter;
