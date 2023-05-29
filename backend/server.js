const mongoose = require("mongoose");
const express = require("express");
const env = require("dotenv").config();
const cors = require("cors");
const app = express();
const routes = require("./routes/BurrowRoute");
const port = process.env.PORT | 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((e) => console.log(e.message));

app.use("/api", routes);
app.listen(port, () => console.log(`Listening at ${port}`));
