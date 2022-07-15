const express = require("express");
const app = express();
const PORT = 8001;
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");
const animeRoutes = require("./routes/anime");

app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(cookieParser());

app.use(express.json());

app.use("/", userRoutes);
app.use("/", animeRoutes);

app.post("/cookie", (req, res) => {
  res.cookie("test", "cookie");
  res.json("cookie has been set");
});

const URI = process.env.URI;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error);
  });
