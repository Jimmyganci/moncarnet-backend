const connection = require('../db-config');
const Joi = require('joi');

const db = connection.promise();

const validate = (data: any, forCreation =true) => {
	const presence = forCreation ? "required" : "optional";
	return Joi.object({
		immat: Joi.string().min(8).max(15).presence(presence),
		registration_date: Joi.date().greater(1-1-1970).presence(presence),
		model_id_model: Joi.number().int().presence(presence),
		user_id_user: Joi.number().int().presence(presence),
		service_book_id_service_book: Joi.number().int().presence(presence),
        types_id_type: Joi.number().int().presence(presence),
        url_vehiculeRegistration: Joi.string().max(255).presence(presence),
	}).validate(data, { abortEarly: false }).error;
};

const findMany = () => {
    let sql = "SELECT * FROM vehicules";
    return db.query(sql).then(([results]: any) => results);
  };

module.exports = {
    findMany
}