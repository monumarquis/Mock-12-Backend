const productModel = require("./product.model");
const express = require("express");
const app = express.Router();

app.get("/", async (req, res) => {
  let products = await productModel.find({});
  return res.status(200).send(products);
});

module.exports = app;
