import express from "express";
const vehiculesRouter = require("./vehicules");
const usersRouter = require("./users");
const prosRouter = require("./pros");
const service_bookRouter = require("./service_book");
const brandsRouter = require("./brands");
const modelsRouter = require("./models");
const authRouter = require("./auth");
import typesRouter from "./types";
import appointmentRouter from "./appointment";
import checkToken from "../middleware/checkToken";

const setupRoutes = (app: express.Application) => {
  // vehicules routes
  app.use("/api/vehicules", checkToken, vehiculesRouter);
  // Users routes
  app.use("/api/users", usersRouter);
  // Pros routes
  app.use("/api/pros", prosRouter);
  // Service_book routes
  app.use("/api/service_book", checkToken, service_bookRouter);
  // Brands routes
  app.use("/api/brands", checkToken, brandsRouter);
  // Models routes
  app.use("/api/models", checkToken, modelsRouter);
  // Types routes
  app.use("/api/types", checkToken, typesRouter);
  //   Auth routes
  app.use("/api/auth", authRouter);
  // Appointment Route
  app.use("/api/appointment", checkToken, appointmentRouter);
};

module.exports = {
  setupRoutes,
};
