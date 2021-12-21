import { Application } from "express";
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app: Application = express();
import { handleError } from "./middleware/errors";

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

app.use(handleError);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
