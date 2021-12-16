"use strict";
var vehiculesRouter = require("./vehicules");
var usersRouter = require("./users");
var prosRouter = require("./pros");
var service_bookRouter = require("./service_book");
var brandsRouter = require("./brands");
var modelsRouter = require("./models");
var authRouter = require("./auth");
var setupRoutes = function (app) {
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
    //   Auth routes
    app.use("/api/auth", authRouter);
};
module.exports = {
    setupRoutes: setupRoutes
};
//# sourceMappingURL=index.js.map