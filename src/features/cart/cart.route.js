const cartModel = require("./cart.model");
const express = require("express");
const app = express.Router();

// get cart
app.get("/", async (req, res) => {
  let { userId } = req.body;
  try {
    if (userId) {
      let cart = await cartModel.find({ user: userId }).populate("product");
      return res.status(200).send(cart);
    } else return res.status(401).send({ message: "Not Authenticated" });
  } catch {
    return res.status(404).send({ message: "something went wrong" });
  }
});

// post cart
app.post("/", async (req, res) => {
  let { userId, productId, quantity } = req.body;
  //   console.log(typeof userId, typeof productId, typeof quantity);
  if (!userId || !productId || !quantity) {
    return res.status(404).send({ message: "Request Not Found" });
  }
  try {
    let cart = await cartModel({
      user: userId,
      product: productId,
      quantity,
    });
    cart.save();
    // console.log(cart)
    return res
      .status(201)
      .send({ cart, message: "Product added Successfully" });
  } catch (err) {
    return res.status(403).send({ message: err.message });
  }
});

// update cart Route
app.patch("/", async (req, res) => {
  let { userId, productId, quantity } = req.body;
  //   console.log(typeof userId, typeof productId, typeof quantity);
  if (!userId || !productId || !quantity) {
    return res.status(404).send({ message: "Request Not Found" });
  }
  try {
    let UpdateCart = await cartModel.findOneAndUpdate(
      {
        user: userId,
        product: productId,
      },
      { quantity },
      { new: true }
    );
    return res
      .status(202)
      .send({ UpdateCart, message: "Product Updated Successfully" });
  } catch (err) {
    return res.status(403).send({ message: err.message });
  }
});

// delete cart
app.delete("/", async (req, res) => {
  let { userId, productId } = req.body;
  //   console.log(typeof userId, typeof productId, typeof quantity);
  if (!userId || !productId) {
    return res.status(404).send({ message: "Request Not Found" });
  }
  try {
    let deleteCart = await cartModel.findOneAndDelete({
      user: userId,
      product: productId,
    });
    return res
      .status(202)
      .send({message: "Product Deleted Successfully" });
  } catch (err) {
    return res.status(403).send({ message: err.message });
  }
});
module.exports = app;
