const mongoose = require("mongoose");

const productdescriptionSchema = new mongoose.Schema({
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
  },
  color: {
    type: String,
  },
  url: {
    type: String,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
  },
  // _id: {
  //   type: String,
  //   default: function () {
  //     return this.productid;
  //   },
  // },
});

module.exports = mongoose.model(
  "productsdescriptions",
  productdescriptionSchema
);
