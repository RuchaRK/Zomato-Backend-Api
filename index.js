const express = require("express");
const app = express();
require("dotenv").config();
require("./db");

const restaurantRouter = require("./Controller/restaurants.controller.js");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.use("/restaurants", restaurantRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
