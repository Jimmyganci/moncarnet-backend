import { Request, Response, NextFunction } from "express";
require("dotenv").config();
import minioClient from "../helpers/minio";
// const Minio = require("minio");

const upload = async (req: Request, res: Response, next: NextFunction) => {
  if (req.files !== null) {
    let objectName = "";
    switch (req.baseUrl) {
      case "/api/vehicules":
        objectName = `/${req.body.immat}/greenCard/`;
        break;
      case "/api/service_book":
        objectName = `/${req.body.immat}/invoice/`;
        break;
      default:
        "";
    }

    try {
      const obj = await minioClient.putObject(
        process.env.MINIO_BUCKET,
        "/user/" + req.userLogin.id_user + objectName + req.files.file.name,
        req.files.file.data
      );
      res.status(200).json({
        etag: obj,
        url: `https://${process.env.MINIO_ENDPOINT}/${
          process.env.MINIO_BUCKET
        }/user/${
          req.userLogin.id_user
        }${objectName}${req.files.file.name.replace(/ /g, "")}`,
      });
      next();
    } catch (err) {
      res.status(404).send(err);
    }
  } else {
    res.status(404).send("Need to upload a files!");
  }
};

export default upload;
