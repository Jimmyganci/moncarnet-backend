const carsRouter = require("./cars");

const setupRoutes = (app: any) => {
  // Cars routes
  app.use("/api/cars", carsRouter);
};

module.exports = {
  setupRoutes,
};
