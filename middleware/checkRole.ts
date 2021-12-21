// import { NextFunction, Request, Response } from "express";
// // function parseJwt(token: string) {
// //   const base64Url = token.split(".")[1];
// //   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// //   const buff = new Buffer(base64, "base64");
// //   const payloadinit = buff.toString("ascii");
// //   const payload = JSON.parse(payloadinit);
// //   return payload.role;
// // }

// function checkRole(req: Request, res: Response, next: NextFunction): void {
//   try {
//     const rawToken = req.headers.cookie;
//     const token = rawToken?.split("=");
//     console.log(rawToken, token);

//     if (typeof token === "undefined" || typeof rawToken === "undefined") {
//       throw new Error("You need to login.");
//     }
//     // const role = parseJwt(rawToken as string);

//     // if (role !== "ADMIN") {
//     //   throw new Error("Only administrators can acces this ressource");
//     // }

//     return next();
//   } catch (err) {
//     res.status(401);

//     return next(err);
//   }
// }

// export default checkRole;
