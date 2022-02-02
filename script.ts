import { Application } from "express";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app: Application = express();
import { handleError } from "./middleware/errors";
import fileUpload from "express-fileupload";

const { setupRoutes } = require("./controllers/index");

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

const port = process.env.PORT || 8000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
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
