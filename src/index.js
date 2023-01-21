require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const app = express();
const User = require("./features/user/user.route");
const product = require("./features/product/product.route");
const cart = require("./features/cart/cart.route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", User);
app.use("/products", product);
app.use("/cart", cart);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("This is Home Route of Mock-Revision Backend");
});

app.listen(PORT, async () => {
  await connect();
});

