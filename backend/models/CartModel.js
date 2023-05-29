const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  customer: {
    type: String,
  },
  products: [
    {
      product_id: {
        type: String,
        required: true,
      },
      product_name: {
        type: String,
        required: true,
      },
      product_price: {
        type: Number,
        required: true,
      },
      product_quantity: {
        type: Number,
      },
      product_image: {
        type: String,
      },
      _id: {
        type: String,
        default: function () {
          return this.product_id;
        },
      },
    },
  ],
  total_price: {
    type: String,
  },
  _id: {
    type: String,
    default: function () {
      return this.customer;
    },
  },
});

module.exports = mongoose.model("carts", cartSchema);
