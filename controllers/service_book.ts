import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bodyValidator from "../middleware/bodyValidator";
const { postServiceBook } = require("../JOI/validate");
const service_bookRouter = require("express").Router();

const prisma = new PrismaClient();

service_bookRouter.get("/", async (req: Request, res: Response) => {
  const serviceBook = await prisma.service_Book.findMany();
  res.json(serviceBook);
});

service_bookRouter.post(
  "/",
  bodyValidator(postServiceBook),
  async (req: Request, res: Response) => {
    const addServiceBook = await prisma.service_Book.create({
      data: {
        date: new Date(req.body.date),
        service: req.body.service,
        observations: req.body.observations,
        pros_id_pros: Number(req.body.pros_id_pros),
        kilometrage: req.body.kilometrage,
        url_invoice: req.body.url_invoice,
        vehicules_immat: req.body.vehicules_immat,
      },
    });
    res.json(addServiceBook);
  }
);
service_bookRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  const userUpdate = await prisma.service_Book.update({
    where: {
      id_service_book: id,
    },
    data: {
      date: new Date(req.body.date),
      service: req.body.service,
      observations: req.body.observations,
      pros_id_pros: Number(req.body.pros_id_pros),
      kilometrage: req.body.kilometrage,
      url_invoice: req.body.url_invoice,
      vehicules_immat: req.body.vehicules_immat,
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
