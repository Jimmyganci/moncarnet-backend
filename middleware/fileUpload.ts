const Minio = require("minio");
require("dotenv").config();

// Instantiate the minio client with the endpoint
// and access keys as shown below.
const minioClient = new Minio.Client({
  endPoint: "minio-s3.basile.vernouillet.dev",
  port: 9000,
  useSSL: true,
  accessKey: process.env.ACCES_KEY,
  secretKey: process.env.SECRET_KEY,
});

// File that needs to be uploaded.
const file = "C:/Users/Jimmy/Pictures/chevronclose.png";

// Make a bucket called europetrip.
minioClient.makeBucket("moncarnet-dev", "us-east-1", function (err = Error) {
  if (err) return console.log(err);

  console.log('Bucket created successfully in "us-west-1".');

  const metaData = {
    "Content-Type": "application/octet-stream",
    "X-Amz-Meta-Testing": 1234,
    example: 5678,
  };
  // Using fPutObject API upload your file to the bucket europetrip.
  minioClient.fPutObject(
    "moncarnet-dev",
    "error.ts",
    file,
    metaData,
    function (err = Error) {
      if (err) return console.log(err);
      console.log("File uploaded successfully.");
    }
  );
});
