# moncarnet-backend

npm install

copy ".env.sample" file and add your mysql login
Don't forget to add port for localhost

make npm start to the console for launch the server.

API Mon Carnet

-----------------------Vehicules--------------------------

Get all vehicules: axios.get("/api/vehicules/all")

Result: [
{
"immat": "CL-940-TE",
"registration_date": "2007-10-21T00:00:00.000Z",
"model_id_model": 5,
"user_id_user": 2,
"types_id_type": 2,
"url_vehiculeRegistration": ""
},
{
"immat": "CL-950-TE",
"registration_date": "2012-10-30T00:00:00.000Z",
"model_id_model": 1,
"user_id_user": 1,
"types_id_type": 1,
"url_vehiculeRegistration": ""
},
{
"immat": "CP-900-TE",
"registration_date": "2016-10-30T00:00:00.000Z",
"model_id_model": 2,
"user_id_user": 2,
"types_id_type": 1,
"url_vehiculeRegistration": ""
},
{
"immat": "ML-967-TT",
"registration_date": "2021-10-21T00:00:00.000Z",
"model_id_model": 300,
"user_id_user": 1,
"types_id_type": 1,
"url_vehiculeRegistration": ""
}
]

Get one vehicule: axios.get("/api/vehicules/:immat)
Get one vehicule: axios.get("/api/vehicules/CL-940-TE)

Result :

{
"immat": "CL-940-TE",
"registration_date": "2007-10-21T00:00:00.000Z",
"model_id_model": 5,
"user_id_user": 2,
"types_id_type": 2,
"url_vehiculeRegistration": ""
}

Get user's vehicule: axios.get("/api/vehicules/user/:id)
Get user's vehicule: axios.get("/api/vehicules/user/2)

Get model's vehicule: axios.get("/api/vehicules/model/:id)
Get model's vehicule: axios.get("/api/vehicules/model/5)
Result :
{
"id_model": 5,
"code": "3.2CL",
"name": " - 3.2CL",
"id_brand": 1
}

Get brand's vehicule: axios.get("/api/vehicules/brand/:id)
Get brand's vehicule: axios.get("/api/vehicules/brand/1)
Result:
{
"id_brand": 1,
"code": "ACURA",
"name": "Acura"
}

Post vehicule : axios.post("/api/vehicules")

Put vehicules : axios:put("api/vehicule/:id)

Delete vehicules : axios:delete("api/vehicule/:id)
