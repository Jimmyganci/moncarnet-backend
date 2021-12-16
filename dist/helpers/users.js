"use strict";
require("dotenv").config();
var argon2 = require("argon2");
var jwt = require("jsonwebtoken");
var PRIVATE_KEY = process.env.TOKEN;
var calculateToken = function (userEmail, id_user) {
    if (userEmail === void 0) { userEmail = ""; }
    return jwt.sign({ email: userEmail, id_user: id_user }, PRIVATE_KEY);
};
var decodeToken = function (token) {
    return jwt.decode(token);
};
var hashingOptions = {
    type: argon2.argon2id,
    memoryCost: Math.pow(2, 16),
    timeCost: 5,
    parallelism: 1
};
var hashPassword = function (plainPassword) {
    return argon2.hash(plainPassword, hashingOptions);
};
var verifyPassword = function (plainPassword, hashedPassword) {
    return argon2.verify(hashedPassword, plainPassword, hashingOptions);
};
hashPassword("Jimmy").then(function (res) { return console.log(res); });
module.exports = { calculateToken: calculateToken, decodeToken: decodeToken, hashPassword: hashPassword, verifyPassword: verifyPassword };
//# sourceMappingURL=users.js.map