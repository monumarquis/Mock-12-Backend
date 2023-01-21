const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: { type: String, min: 1, required: true },
  },
  { versionKey: false, timestamps: true }
);

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
