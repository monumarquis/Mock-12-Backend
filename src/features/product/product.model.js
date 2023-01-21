const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    desc: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
