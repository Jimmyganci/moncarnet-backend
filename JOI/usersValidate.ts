import Joi from "joi";

const postUser = Joi.object().keys({
  firstname: Joi.string().min(3).max(100),
  lastname: Joi.string().min(3).max(100),
  email: Joi.string().email({ allowUnicode: false }).required(),
  password: Joi.string().min(7).max(255).required(),
  address: Joi.string().min(5),
  phone: Joi.string().min(6).max(20),
  postal_code: Joi.number().min(5).max(150),
  city: Joi.string().max(150),
});
const postPros = Joi.object().keys({
  name: Joi.string().max(255),
  email: Joi.string().email({ allowUnicode: false }).required(),
  password: Joi.string().min(7).max(255).required(),
  adress: Joi.string().min(5),
  phone: Joi.string().min(6).max(20),
  postal_code: Joi.number().min(5),
  city: Joi.string(),
  siret: Joi.number().min(1).max(99999999999999),
});

module.exports = { postUser, postPros };
