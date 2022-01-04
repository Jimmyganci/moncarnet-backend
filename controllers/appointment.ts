import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import IAppointment from "../interfaces/IAppointment";

const appointmentRouter = require("express").Router();

const prisma = new PrismaClient();

appointmentRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getAllAppointment = await prisma.appointment.findMany();
      res.status(200).json(getAllAppointment);
    } catch (err) {
      next(err);
    }
  }
);

appointmentRouter.get(
  "/user/:idUser",
  async (req: Request, res: Response, next: NextFunction) => {
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
      next(err);
    }
  }
);

appointmentRouter.get(
  "/pros/:idPros",
  async (req: Request, res: Response, next: NextFunction) => {
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
      next(err);
    }
  }
);

appointmentRouter.get(
  "/user/:idUser/pros/:idPros",
  async (req: Request, res: Response, next: NextFunction) => {
    const { idUser, idPros } = req.params;
    try {
      const getOneAppointment = await prisma.appointment.findUnique({
        where: {
          userId_prosId: {
            userId: Number(idUser),
            prosId: Number(idPros),
          },
        },
        rejectOnNotFound: true,
      });
      res.status(200).json(getOneAppointment);
    } catch (err) {
      next(err);
    }
  }
);

appointmentRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
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
      next(err);
    }
  }
);

appointmentRouter.delete(
  "/user/:idUser/pros/:idPros",
  async (req: Request, res: Response, next: NextFunction) => {
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
      next(err);
    }
  }
);

module.exports = appointmentRouter;
