import express from "express";
import vehiculesRouter from "./vehicules";
import usersRouter from "./users";
import prosRouter from "./pros";
import service_bookRouter from "./service_books";
import brandsRouter from "./brands";
import modelsRouter from "./models";
import authRouter from "./auth";
import adminRouter from "./admin";
import typesRouter from "./types";
import appointmentRouter from "./appointments";
import checkToken from "../middleware/checkToken";

const setupRoutes = (app: express.Application) => {
  // vehicules routes
  app.use("/api/vehicules", checkToken, vehiculesRouter);
  // Users routes
  app.use("/api/users", usersRouter);
  // Pros routes
  app.use("/api/pros", prosRouter);
  // Service_book routes
  app.use("/api/service_books", checkToken, service_bookRouter);
  // Brands routes
  app.use("/api/brands", checkToken, brandsRouter);
  // Models routes
  app.use("/api/models", checkToken, modelsRouter);
  // Types routes
  app.use("/api/types", checkToken, typesRouter);
  //   Auth routes
  app.use("/api", authRouter);
  // Appointment Route
  app.use("/api/appointments", checkToken, appointmentRouter);
  // Admin Route
  app.use("/api/admin", adminRouter);
};

export default setupRoutes;
