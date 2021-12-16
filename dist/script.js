"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var cors = require("cors");
var setupRoutes = require("./controllers/index").setupRoutes;
var port = process.env.PORT || 8000;
app.use(express.json());
var corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));
setupRoutes(app);
app.listen(port, function () {
    console.log("Server listening on port ".concat(port));
});
//# sourceMappingURL=script.js.map