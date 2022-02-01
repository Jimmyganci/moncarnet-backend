# <h1>moncarnet-backend</h2>

<pre>npm install</pre>

copy ".env.sample" file and add your mysql login

Don't forget to add port for localhost

<pre>npx prisma deb push</pre>
<h2>Restart your IDE</h2>

make npm start to the console for launch the server.

<pre>npm start</pre>
</br>

# <h2>Upload files</h2>

# <h3>//Upload one files on route vehicule, users or pros//</h3>

<pre>.post("api/vehicules/upload")</pre>
<pre>.post("api/users/upload")</pre>
<pre>.post("api/pros/upload")</pre>

Result data : https://"your_host_minio"/"your_bucket_minio"//invoice//your_files_name.png

<p>Example client:</p>
<pre>
const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const upload = await axios.post(
      "http://localhost:8000/api/vehicules/upload",
      formData,
      { withCredentials: true }
    );
    console.log(upload);
    if (upload) {
      const postVehicule = await axios.post(
        "http://localhost:8000/api/vehicules/",
        {
          immat: immat,
          registration_date: "2015-10-21T00:00:00.000Z",
          url_vehiculeRegistration: upload.data,
          id_modelId: parseInt(model),
          id_typeId: parseInt(type),
          id_userId: parseInt(user),
        },
        {
          withCredentials: true,
        }
      );
      console.log(postVehicule.data);
    }
  };
</pre>

# <h2>Vehicule</h2>

# <h3>// Get all vehicules //</h3>

<pre>.get("/api/vehicules/all")</pre>
<h3>Results</h3>

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

# <h3>//Get one vehicule//</h3>

  <pre>.get("/api/vehicules/:immat)</pre>
  <pre>.get("/api/vehicules/CL-940-TE)</pre>

<h3>Results :</h3>
<pre>
{
"immat": "CL-940-TE",
"registration_date": "2007-10-21T00:00:00.000Z",
"model_id_model": 5,
"user_id_user": 2,
"types_id_type": 2,
"url_vehiculeRegistration": ""
}</pre>

# <h3>//Get user's vehicule//</h3>

<pre>.get("/api/vehicules/user/:idUser)</pre>
<pre>.get("/api/vehicules/user/2)</pre>

# <h3>//Get model's vehicule//</h3>

<pre>.get("/api/vehicules/:immat/model)</pre>
<pre>.get("/api/vehicules/HY-567-HY/model)</pre>

<h3>Results :</h3>

<pre>
{
"id_model": 5,
"code": "3.2CL",
"name": " - 3.2CL",
"id_brand": 1
}</pre>

# <h3>//Get brand's vehicule//</h3>

<pre>.get("/api/vehicules/:immat/brand)</pre>
<pre>.get("/api/vehicules/HY-678-HY/brand)</pre>

<h3>Results:</h3>
<pre>
{
"id_brand": 1,
"code": "ACURA",
"name": "Acura"
}</pre>

# <h3>//Post vehicule//</h3>

<pre>.post("/api/vehicules")</pre>

# <h3>//Put vehicules//</h3>

<pre>.put("api/vehicule/:id)</pre>

# <h3>//Delete vehicules//</h3>

<pre>.delete("api/vehicule/:id)</pre>

# <h2>Users</h2>

# <h3>//Get all users//</h3>

<pre>get("api/users/all")</pre>

Results:

<pre>{
        "id_user": 1,
        "firstname": "Buddy",
        "lastname": "Cadet",
        "email": "buddycadet@gmail.com",
        "hashedPassword": "$argon2id$v=19$m=65536,t=5,p=1$IaW4RanaMVmzJt4tbipbBQ$LzRQanarVEivgJMXXJO2uhlNrhVe89rRLNlvyL0UDf4",
        "address": "Angresse",
        "phone": "06-78-76-78-76",
        "postal_code": 40000,
        "city": "Angresse"
    },
    {
        "id_user": 2,
        "firstname": "Buddy",
        "lastname": "Ganci",
        "email": "buddy.ganci@gmail.com",
        "hashedPassword": "$argon2id$v=19$m=65536,t=5,p=1$KcDNxFFRs2+0CQTCSCjalQ$7eEVEdmO0HZUWZPXzV5Zq5mRHAEhS/YkkZQxG0GphHg",
        "address": "rue de la croquette",
        "phone": "06-78-76-78-76",
        "postal_code": 40130,
        "city": "Capbreton"
    },
    {
        "id_user": 3,
        "firstname": "mika",
        "lastname": "dut",
        "email": "mika.dut@gmail.com",
        "hashedPassword": "$argon2id$v=19$m=65536,t=5,p=1$Sq9xsyQtq+xLrjR/vJIsnQ$KgSIEqAUA+ljIs8lbE8fklCVNWj1XLAIWJJMPhEDQ44",
        "address": "rue de la grotte",
        "phone": "06-78-76-78-76",
        "postal_code": 93000,
        "city": "Paris"
    },</pre>

# <h3>//Get one user//</h3>

<pre>.get("api/users/:id")</pre>
<pre>.get("/api/users/2")</pre>

Results:

<pre>{
    "id_user": 2,
    "firstname": "Buddy",
    "lastname": "Ganci",
    "email": "buddy.ganci@gmail.com",
    "hashedPassword": "$argon2id$v=19$m=65536,t=5,p=1$KcDNxFFRs2+0CQTCSCjalQ$7eEVEdmO0HZUWZPXzV5Zq5mRHAEhS/YkkZQxG0GphHg",
    "address": "rue de la croquette",
    "phone": "06-78-76-78-76",
    "postal_code": 40130,
    "city": "Capbreton"
}</pre>

# <h3>//Get vehicule's user//</h3>

<pre>.get("api/users/vehicule/:idBrand")</pre>
<pre>.get("/api/users/vehicules/1")</pre>

Results:

<pre>{
    {
        "immat": "MM-967-TT",
        "registration_date": "2021-10-21T00:00:00.000Z",
        "model_id_model": 100,
        "user_id_user": 1,
        "types_id_type": 1,
        "url_vehiculeRegistration": ""
    },
    {
        "immat": "MZ-877-UU",
        "registration_date": "2005-10-21T00:00:00.000Z",
        "model_id_model": 100,
        "user_id_user": 1,
        "types_id_type": 1,
        "url_vehiculeRegistration": ""
    }
}</pre>

# <h3>//Get pro's user//</h3>

<pre>.get("api/users/pros/:idUser")</pre>
<pre>.get("/api/users/pros/1")</pre>

Results:

<pre>{
    []
}</pre>

# <h3>//Delete users's pros//</h3>

<pre>.get("api/users/:idUser/prosDeleted/:idPros")</pre>
<pre>.get("/api/users/2/prosDeleted/1")</pre>

Results:

<pre>{
    []
}</pre>

# <h3>//Get user by lastname//</h3>

<pre>.get("api/users/all?lastname=?")</pre>
<pre>.get("/api/users/all?lastname=cade")</pre>

Results:

<pre>{
     {
        "id_user": 1,
        "firstname": "Buddy",
        "lastname": "Cadet",
        "email": "buddycadet@gmail.com",
        "hashedPassword": "$argon2id$v=19$m=65536,t=5,p=1$BAySd1UMW6s38RbnPUjlgA$MQyZYxKXX1H379J9jbOKz7p0Lh43T1SbbWtLYPaAIVU",
        "address": "Angresse",
        "phone": "06-78-76-78-76",
        "postal_code": 40000,
        "city": "Angresse"
    }
}</pre>

# <h3>//Get user by postal code//</h3>

<pre>.get("api/users/all?postal_code=?")</pre>
<pre>.get("/api/users/all?postal_code=40130")</pre>

Results:

<pre>
     {
        "id_user": 2,
        "firstname": "Buddy",
        "lastname": "Ganci",
        "email": "buddy.ganci@gmail.com",
        "hashedPassword": "$argon2id$v=19$m=65536,t=5,p=1$KcDNxFFRs2+0CQTCSCjalQ$7eEVEdmO0HZUWZPXzV5Zq5mRHAEhS/YkkZQxG0GphHg",
        "address": "rue de la croquette",
        "phone": "06-78-76-78-76",
        "postal_code": 40130,
        "city": "Capbreton"
    }
</pre>

# <h3>//Get user by city//</h3>

<pre>.get("api/users/all?city=?")</pre>
<pre>.get("/api/users/all?city=cap")</pre>

Results:

<pre>
     {
        "id_user": 2,
        "firstname": "Buddy",
        "lastname": "Ganci",
        "email": "buddy.ganci@gmail.com",
        "hashedPassword": "$argon2id$v=19$m=65536,t=5,p=1$KcDNxFFRs2+0CQTCSCjalQ$7eEVEdmO0HZUWZPXzV5Zq5mRHAEhS/YkkZQxG0GphHg",
        "address": "rue de la croquette",
        "phone": "06-78-76-78-76",
        "postal_code": 40130,
        "city": "Capbreton"
    }
</pre>

# <h3>//Post user//</h3>

<pre>.get("api/users/")</pre>
<pre>.get("/api/users/")</pre>

Results:

<pre>
     {
        "id_user": 10,
    "firstname": "matthieu",
    "lastname": "dubo",
    "email": "matthieu.dubo@gmail.com",
    "hashedPassword": "$argon2id$v=19$m=65536,t=5,p=1$cOJ+Ee/IHuVXjBdmf828bg$kqeTBkm/N/NIwgFJE38giaVaW3sB67L2brD6hSLUCck",
    "address": "rue de la benne",
    "phone": "06-78-76-78-76",
    "postal_code": 40100,
    "city": "Saubrigue"
    }
</pre>

# <h3>//Add user's pro//</h3>

<pre>.get("api/users/pro/:idUser")</pre>
<pre>.get("/api/users/pro/4")</pre>

Results:

<pre>
     {
        "id_pros": 1,
        "name": "Bernadin auto",
        "email": "auto@gmail.com",
        "hashedPassword": "bon",
        "adress": "78 avenue du temps",
        "postal_code": 33130,
        "city": "Bordeaux",
        "siret": 76549864,
        "phone": "06-56-57-57-76"
    },
    {
        "id_pros": 2,
        "name": "auto",
        "email": "auto6@gmail.com",
        "hashedPassword": "bon",
        "adress": "78 avenue du temps",
        "postal_code": 33130,
        "city": "Bordeaux",
        "siret": 76549864,
        "phone": "06-56-57-57-76"
    }
</pre>

# <h3>//Put user//</h3>

<pre>.get("api/users/:idUser")</pre>
<pre>.get("/api/users/1")</pre>

Results:

<pre>
     {
     "id_user": 1,
    "firstname": "Buddy",
    "lastname": "Cadet",
    "email": "buddycadet@gmail.com",
    "hashedPassword": "$argon2id$v=19$m=65536,t=5,p=1$BAySd1UMW6s38RbnPUjlgA$MQyZYxKXX1H379J9jbOKz7p0Lh43T1SbbWtLYPaAIVU",
    "address": "Angresse",
    "phone": "06-78-76-78-76",
    "postal_code": 40000,
    "city": "Angresse"
    }
</pre>

# <h3>//Delete user//</h3>

<pre>.get("api/users/:idUser")</pre>
<pre>.get("/api/users/1")</pre>

Results:

<pre>
     "Buddy deleted"
</pre>

# <h2>Appointment</h2>

# <h3>//Get all appointment//</h3>

<pre>.get("/api/appointment")</pre>

Results:

<pre>
     [
    {
        "userId": 1,
        "prosId": 2,
        "date": "2022-03-01T00:00:00.000Z",
        "comment": "entretien 10000"
    },
    {
        "userId": 1,
        "prosId": 4,
        "date": "2022-03-01T00:00:00.000Z",
        "comment": "entretien 10000"
    }
]
</pre>

# <h3>//Get one appointment//</h3>

<pre>.get("/api/appointment/user/:userId/pros/prosId")</pre>
<pre>.get("/api/appointment/user/1/pros/4")</pre>

Results:

<pre>
     {
    "userId": 1,
    "prosId": 4,
    "date": "2022-03-01T00:00:00.000Z",
    "comment": "entretien 10000"
}
</pre>

# <h3>//Get all users's appointment//</h3>

<pre>.get("/api/appointment/user/userId")</pre>
<pre>.get("/api/appointment/user/1")</pre>

Results:

<pre>
     [
    {
        "id_pros": 2,
        "name": "Pneu123",
        "email": "pneu123@gmail.com",
        "hashedPassword": "$argon2id$v=19$m=65536,t=5,p=1$0OZViyOU5ZO2c23P2lNAew$3KqrgZwFerxgsH7xkC1NXvK3GukRJfUpvhTnV4Wru2E",
        "address": "78 avenue du pneu",
        "postal_code": 40130,
        "city": "Capbreton",
        "siret": "23456545432334",
        "phone": "06-90-76-57-76"
    },
    {
        "id_pros": 4,
        "name": "Garage des Pins",
        "email": "garagedespins@gmail.com",
        "hashedPassword": "$argon2id$v=19$m=65536,t=5,p=1$UD6EO+ouPfx7JQyJjRIvow$1joKcpBw9bCupaGiR4Ge7CGl2xBp9Q/jb37ZdGccKdg",
        "address": "78 avenue des pins",
        "postal_code": 40130,
        "city": "Capbreton",
        "siret": "23456545432334",
        "phone": "06-90-76-57-76"
    }
]
</pre>

# <h3>//Get all pros's appointment//</h3>

<pre>.get("/api/appointment/pros/prosId")</pre>
<pre>.get("/api/appointment/pros/4")</pre>

Results:

<pre>
    [
    {
        "id_user": 1,
        "firstname": "Buddy",
        "lastname": "Cadet",
        "email": "buddycadet@gmail.com",
        "hashedPassword": "$argon2id$v=19$m=65536,t=5,p=1$wQyXp/JtaEONYdoAFu31sA$oC+59EHM3yybccAS9mqtsPVMRZBHd91SiNCf7EGtLno",
        "address": "Angresse",
        "phone": "06-78-76-78-76",
        "postal_code": 40000,
        "city": "Angresse"
    }
]
</pre>

# <h3>//Post appointment//</h3>

<pre>.get("/api/appointment/pros")</pre>
<pre>.get("/api/appointment/pros")</pre>

Results:

<pre>
   {
    "userId": 1,
    "prosId": 4,
    "date": "2022-03-01T00:00:00.000Z",
    "comment": "entretien 10000"
}
</pre>

# <h3>//Post appointment//</h3>

<pre>.get("/api/appointment/pros")</pre>
<pre>.get("/api/appointment/pros")</pre>

Results:

<pre>
   {
    "userId": 1,
    "prosId": 4,
    "date": "2022-03-01T00:00:00.000Z",
    "comment": "entretien 10000"
}
</pre>

# <h3>//Delete one appointment//</h3>

<pre>.get("/api/appointment/user/1/pros/1")</pre>
<pre>.get("/api/appointment/user/userId/pros/prosId")</pre>

Results:

<pre>
   Appointment of Tue Mar 01 2022 01:00:00 GMT+0100 (heure normale d’Europe centrale) with pros Id 1 deleted
</pre>
