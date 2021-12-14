require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const PRIVATE_KEY = process.env.TOKEN;

const calculateToken = (userEmail = "", id_user: number) => {
  return jwt.sign({ email: userEmail, id_user }, PRIVATE_KEY);
};
const decodeToken = (token: string) => {
  return jwt.decode(token);
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (plainPassword: string) => {
  return argon2.hash(plainPassword, hashingOptions);
};

const verifyPassword = (plainPassword: string, hashedPassword: string) => {
  return argon2.verify(hashedPassword, plainPassword, hashingOptions);
};

hashPassword("Jimmy").then((res: Response) => console.log(res));

module.exports = { calculateToken, decodeToken, hashPassword, verifyPassword };
