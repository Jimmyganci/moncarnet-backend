import { Request, Response, NextFunction } from "express";
require("dotenv").config();
const Minio = require("minio");

const upload = (req: Request, res: Response, next: NextFunction) => {
  if (req.files !== null) {
    const minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT,
      useSSL: true,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
    let objectName = "";
    switch (req.baseUrl) {
      case "/api/vehicules":
        objectName = "/greenCard/";
        break;
      case "/api/users":
        objectName = "/invoice/";
        break;
      case "/api/pros":
        objectName = "/invoice_quote/";
        break;
      default:
        "";
    }
    minioClient.putObject(
      "moncarnet-dev",
      objectName + req.files.file.name,
      req.files.file.data,
      function (error: any) {
        if (error) {
          res.status(404).send("error");
          next(error);
          return console.log(error);
        } else {
          res
            .status(200)
            .send(
              `https://${process.env.MINIO_ENDPOINT}/moncarnet-dev/${objectName}/${req.files.file.name}`
            );
          next();
        }
      }
    );
  } else {
    res.status(404).send("Need to upload a files!");
  }
};

export default upload;
