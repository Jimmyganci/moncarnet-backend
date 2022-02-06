import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import minioClient from "../helpers/minio";

const upload = async (req: Request, res: Response, next: NextFunction) => {
  const { file }: any = req.files;

  if (req.files !== null) {
    const minioBucket = process.env.MINIO_BUCKET || "";
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
        minioBucket,
        "/user/" +
          req.userLogin.id_user +
          objectName +
          file.name.replace(/ /g, ""),
        file.data
      );
      res.status(200).json({
        etag: obj,
        url: `https://${process.env.MINIO_ENDPOINT}/${
          process.env.MINIO_BUCKET
        }/user/${req.userLogin.id_user}${objectName}${file.name.replace(
          / /g,
          ""
        )}`,
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
