export {};
const carsRouter = require("express").Router();
const Car = require("../models/car");

carsRouter.get("/", (req: any, res: any) => {
  const { immat, brand, model } = req.query;
  Car.findMany({ filters: { immat, brand, model } })
    .then((cars: Response) => {
      res.json(cars);
    })
    .catch((err: Error) => {
      console.log(err);
      res.status(500).send("Error retrieving cars from database");
    });
});

module.exports = carsRouter;
