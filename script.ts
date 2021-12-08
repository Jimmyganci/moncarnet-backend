export {};
const express = require("express");
const app = express();
const cors = require("cors");
const { setupRoutes } = require("./routes/index");

const port = process.env.PORT || 8000;

app.use(express.json());

const corsOptions = {
  origin: true,
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
