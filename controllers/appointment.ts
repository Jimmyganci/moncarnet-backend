import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import IAppointment from "../interfaces/IAppointment";
const appointmentRouter = require("express").Router();

const prisma = new PrismaClient();

appointmentRouter.get("/", async (req: Request, res: Response) => {
  try {
    const getAllAppointment = await prisma.appointment.findMany();
    res.status(200).json(getAllAppointment);
  } catch (err) {
    res.status(404).send("Not found");
  }
});

appointmentRouter.get("/user/:idUser", async (req: Request, res: Response) => {
  const { idUser } = req.params;
  try {
    const getOneAppointment = await prisma.pros.findMany({
      where: {
        appointmentUser: {
          some: {
            users: {
              id_user: Number(idUser),
            },
          },
        },
      },
    });
    res.status(200).json(getOneAppointment);
  } catch (err) {
    res.status(404).send(err);
  }
});

appointmentRouter.get("/pros/:idPros", async (req: Request, res: Response) => {
  const { idPros } = req.params;
  try {
    const getOneAppointment = await prisma.users.findMany({
      where: {
        appointmentPros: {
          some: {
            pros: {
              id_pros: Number(idPros),
            },
          },
        },
      },
    });
    res.status(200).json(getOneAppointment);
  } catch (err) {
    res.status(404).send(err);
  }
});

appointmentRouter.get(
  "/user/:idUser/pros/:idPros",
  async (req: Request, res: Response) => {
    const { idUser, idPros } = req.params;
    try {
      const getOneAppointment = await prisma.appointment.findUnique({
        where: {
          userId_prosId: {
            userId: Number(idUser),
            prosId: Number(idPros),
          },
        },
      });
      res.status(200).json(getOneAppointment);
    } catch (err) {
      res.status(404).send(err);
    }
  }
);

appointmentRouter.post("/", async (req: Request, res: Response) => {
  const { userId, prosId, date, comment }: IAppointment = req.body;
  try {
    const postAppointment = await prisma.appointment.create({
      data: {
        userId: userId,
        prosId: prosId,
        date: new Date(date),
        comment: comment,
      },
    });
    res.status(200).send(postAppointment);
  } catch (err) {
    res.status(404).send(err);
  }
});

appointmentRouter.delete(
  "/user/:idUser/pros/:idPros",
  async (req: Request, res: Response) => {
    const { idUser, idPros } = req.params;
    try {
      const deleteOneAppointment = await prisma.appointment.delete({
        where: {
          userId_prosId: {
            userId: Number(idUser),
            prosId: Number(idPros),
          },
        },
      });
      res
        .status(200)
        .send(
          `Appointment of ${deleteOneAppointment.date} with pros Id ${deleteOneAppointment.prosId} deleted`
        );
    } catch (err) {
      res.status(404).send(err);
    }
  }
);

module.exports = appointmentRouter;
