# moncarnet-backend

<pre>npm install</pre>

copy ".env.sample" file and add your mysql login

Don't forget to add port for localhost

make npm start to the console for launch the server.

<pre>npm start</pre>

<h1>Vehicule</h1>

<h2>// Get all vehicules //</h2>

<pre>.get("/api/vehicules/all")</pre>
<h2>Results</h2>

<pre>[
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
]</pre>

# <h2>//Get one vehicule//</h2>

  <pre>.get("/api/vehicules/:immat)</pre>
  <pre>.get("/api/vehicules/CL-940-TE)</pre>

<h2>Results :</h2>
<pre>
{
"immat": "CL-940-TE",
"registration_date": "2007-10-21T00:00:00.000Z",
"model_id_model": 5,
"user_id_user": 2,
"types_id_type": 2,
"url_vehiculeRegistration": ""
}</pre>

# <h2>//Get user's vehicule//</h2>

<pre>.get("/api/vehicules/user/:id)</pre>
<pre>.get("/api/vehicules/user/2)</pre>

# <h2>//Get model's vehicule//</h2>

<pre>.get("/api/vehicules/model/:id)</pre>
<pre>.get("/api/vehicules/model/5)</pre>

<h2>Results :</h2>

<pre>
{
"id_model": 5,
"code": "3.2CL",
"name": " - 3.2CL",
"id_brand": 1
}</pre>

# <h2>//Get brand's vehicule//</h2>

<pre>.get("/api/vehicules/brand/:id)</pre>
<pre>.get("/api/vehicules/brand/1)</pre>

<h2>Results:</h2>
<pre>
{
"id_brand": 1,
"code": "ACURA",
"name": "Acura"
}</pre>

# <h2>//Post vehicule//</h2>

<pre>.post("/api/vehicules")</pre>

# <h2>//Put vehicules//</h2>

<pre>.put("api/vehicule/:id)</pre>

# <h2>//Delete vehicules//</h2>

<pre>.delete("api/vehicule/:id)</pre>
