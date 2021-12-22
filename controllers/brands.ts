import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { string } from "joi";
const brandsRouter = require("express").Router();

const prisma = new PrismaClient();

interface BrandInfo {
  id_brand : number,
  code: string,
  name :string
}

// authorization:admin
brandsRouter.get("/", async (req: Request, res: Response) => {
  const brands = await prisma.brand.findMany();
  res.json(brands);
});

// Search a vehicule by id
brandsRouter.get("/:id", async (req: Request, res: Response) =>  {
  const id = parseInt(req.params.id);
const brandsById = await prisma.brand.findUnique({

  where: {
    id_brand: id,
  },
});
res.json(brandsById)
});

// search/obtain  models for a specific brand
brandsRouter.get("/:idbrand/models", async (req: Request, res: Response) => {
  const idBrand = parseInt(req.params.idbrand)
  const findModelsByBrand = await prisma.models.findMany({
    where : {
      id_brand : idBrand,
    }

  })

  res.status(200).json(findModelsByBrand)
});

// search/obtain  vehicules for a specific brand (for pros)search/obtain  vehicules for a specific brand (for pros)
brandsRouter.get("/vehicules/:idbrand", async (req: Request, res: Response) => {
  const idBrand = req.params.idbrand;
  const vehiculesByBrand = await prisma.vehicules.findMany({
    where: {
      models: {
        id_brand: parseInt(idBrand),
      },
    },
  });
  res.status(200).json(vehiculesByBrand);
});

// serach/obtain users by brand 

brandsRouter.get("/:idbrand/users", async (req: Request, res: Response) => {
  const idBrand = req.params.idbrand;
  const usersByBrand = await prisma.users.findMany({
    where: {
      vehicules: {
        some:{
          models:{
            brand:{id_brand: Number(idBrand)}
          }
        }
      }
    },
  });
  res.status(200).json(usersByBrand);
});   

// brandFilteredByVehiculeName / brandFilteredByUsers / allBrands
// brandsRouter.get("/all", async (req: Request, res: Response) => {
//   const nameFilter = String(req.query.name);
//   const userFilter = String(req.query.city);

//   if (req.query.name) {
//     const brandFilteredByVehiculeName = await prisma.brand.findUnique({
//       where: {
//         vehicules: {
//           some:{
//             models:{
//               brand:{id_brand: Number(idBrand)}
//             }
//           }
//         }
//       },
//     });
//     res.status(200).json(brandFilteredByVehiculeName);
//   } else if (req.query.city) {
//     const brandFilteredByUsers = await prisma.users.findMany({
//       where: {
//         city: {
//           contains: userFilter,
//         },
//       },
//     });
//     res.status(200).json(brandFilteredByUsers);
//   } else {
//     const allBrands = await prisma.users.findMany();
//     res.status(200).json(allBrands);
//   }
// });

// brandsRouter.post("/", async (req: Request, res: Response) => {
//   const addBrands = await prisma.brand.create({
//     data: {
//       code: req.body.code,
//       name: req.body.name,
//     },
//   });
//   res.json(addBrands);
// });

brandsRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const brandUpdate = await prisma.brand.update({
    where: {
      id_brand: id,
    },
    data: {
      code: req.body.code,
      name: req.body.name,
    },
  });
  res.json(brandUpdate);
});

brandsRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const brandDeleted = await prisma.brand.delete({
    where: {
      id_brand: id,
    },
  });
  res.send("brand Deleted");
});

module.exports = brandsRouter;

// brands.ts : "get({filters: name})", "get:id", "get/brand/models", "get/vehicules/:idbrand", "get/:idbrand/users", post, put, delete