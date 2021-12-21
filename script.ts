import { Application } from "express";

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app: Application = express();

const { setupRoutes } = require("./controllers/index");

const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true, // accept all origin
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
setupRoutes(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
