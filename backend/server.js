require("dotenv").config();
const express = require("express");
const app = express();
const Routes = require("./routes/router");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;
app.set('trust proxy', 1);
app.use(express.json());
app.use(bodyParser.json());
require("./config/db");
app.use(cors());

app.use("/api", Routes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port`);
});
