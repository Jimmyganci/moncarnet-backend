import Joi from "joi";

const postUser = Joi.object().keys({
  firstname: Joi.string().min(3).max(100),
  lastname: Joi.string().min(3).max(100),
  email: Joi.string().email({ allowUnicode: false }).required(),
  password: Joi.string().min(7).max(255).required(),
  address: Joi.string().min(5),
  phone: Joi.string().min(6).max(20),
  postal_code: Joi.number().integer().min(1).max(99999),
  city: Joi.string().max(150),
});

const postPros = Joi.object().keys({
  name: Joi.string().max(255),
  email: Joi.string().email({ allowUnicode: false }).required(),
  password: Joi.string().min(7).max(255).required(),
  adress: Joi.string().min(5),
  phone: Joi.string().min(6).max(20),
  postal_code: Joi.number().integer().min(5),
  city: Joi.string(),
  siret: Joi.number().integer().min(1).max(99999999999999),
});

const postVehicule = Joi.object().keys({
  immat: Joi.string().max(15),
  registration_date: Joi.date(),
  model_id_model: Joi.number(),
  user_id_user: Joi.number(),
  types_id_type: Joi.number(),
  url_vehiculeRegistration: Joi.string().allow(null, ""),
});

const postType = Joi.object().keys({
  name_type: Joi.string().max(100),
});

const postServiceBook = Joi.object().keys({
  date: Joi.date(),
  service: Joi.string(),
  observations: Joi.string(),
  pros_id_pros: Joi.number().integer(),
  kilometrage: Joi.number().min(1).max(9999999),
  url_invoice: Joi.string().allow(null, ""),
  vehicules_immat: Joi.string().max(15),
});

const postModel = Joi.object().keys({
  code: Joi.string(),
  name: Joi.string(),
  id_brand: Joi.number().integer(),
});
const postBrand = Joi.object().keys({
  code: Joi.string(),
  name: Joi.string(),
});

module.exports = {
  postUser,
  postPros,
  postVehicule,
  postType,
  postServiceBook,
  postModel,
  postBrand,
};
