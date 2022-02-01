import { Request, Response, NextFunction } from "express";
import prisma from "../helpers/prisma";
import IAppointment from "../interfaces/IAppointment";

const appointmentRouter = require("express").Router();

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
      const getOneAppointment = await prisma.appointment.findMany({
        where: {
          userId: Number(idUser),
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
      const getOneAppointment = await prisma.appointment.findMany({
        where: {
          prosId: Number(idPros),
        },
      });
      res.status(200).json(getOneAppointment);
    } catch (err) {
      next(err);
    }
  }
);

appointmentRouter.get(
  "/:idAppointment",
  async (req: Request, res: Response, next: NextFunction) => {
    const { idAppointment } = req.params;
    try {
      const getOneAppointment = await prisma.appointment.findUnique({
        where: {
          id_appointment: Number(idAppointment),
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
    const { userId, prosId, date, comment, immat }: IAppointment = req.body;
    try {
      const postAppointment = await prisma.appointment.create({
        data: {
          userId: userId,
          prosId: prosId,
          date: new Date(date),
          comment: comment,
          immat: immat,
        },
      });
      res.status(200).send(postAppointment);
    } catch (err) {
      next(err);
    }
  }
);

appointmentRouter.put(
  "/:idAppointment",
  async (req: Request, res: Response, next: NextFunction) => {
    const { idAppointment } = req.params;
    const { userId, prosId, date, comment }: IAppointment = req.body;
    try {
      const updateAppointment = await prisma.appointment.update({
        where: {
          id_appointment: Number(idAppointment),
        },
        data: {
          userId: userId,
          prosId: prosId,
          date: new Date(date),
          comment: comment,
        },
      });
      res.status(200).json(updateAppointment);
    } catch (err) {
      next(err);
    }
  }
);

appointmentRouter.delete(
  "/:idAppointment",
  async (req: Request, res: Response, next: NextFunction) => {
    const { idAppointment } = req.params;
    try {
      const deleteOneAppointment = await prisma.appointment.delete({
        where: {
          id_appointment: Number(idAppointment),
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

export default appointmentRouter;
