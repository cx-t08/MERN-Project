const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  productid: {
    type: String,
    require: true,
  },
  productname: {
    type: String,
    require: true,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  url: {
    type: String,
  },
  price: {
    type: Number,
    require: true,
  },
  _id: {
    type: String,
    default: function () {
      return this.productid;
    },
  },
});

module.exports = mongoose.model("products", productSchema);
