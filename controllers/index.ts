const vehiculesRouter = require("./vehicules");
const usersRouter = require("./users");
const prosRouter = require("./pros");
const service_bookRouter = require("./service_book");
const brandsRouter = require("./brands");
const modelsRouter = require("./models");

const setupRoutes = (app: any) => {
  // vehicules routes
  app.use("/api/vehicules", vehiculesRouter);
  // Users routes
  app.use("/api/users", usersRouter);
  // Pros routes
  app.use("/api/pros", prosRouter);
  // Service_book routes
  app.use("/api/service_book", service_bookRouter);
  // Brands routes
  app.use("/api/brands", brandsRouter);
  // Models routes
  app.use("/api/models", modelsRouter);
};

module.exports = {
  setupRoutes,
};
