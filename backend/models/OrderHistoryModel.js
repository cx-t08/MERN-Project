const mongoose = require("mongoose");

const orderHistorySchema = new mongoose.Schema({
  customer: {
    type: String,
  },
  orderhistory: [
    {
      first_name: {
        type: String,
      },
      last_name: {
        type: String,
      },
      customer_email: {
        type: String,
      },
      street_address: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      pincode: {
        type: Number,
      },
      mobile: {
        type: Number,
      },
      orderdetails: [
        {
          product_id: {
            type: String,
          },
          product_name: {
            type: String,
          },
          product_price: {
            type: Number,
          },
          product_quantity: {
            type: Number,
          },
          product_image: {
            type: [String],
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
        type: Number,
      },
      payment_method: {
        type: String,
      },
      order_date: {
        type: String,
      },
      _id: {
        type: String,
        default: function () {
          return this.customer_email;
        },
      },
    },
  ],
  _id: {
    type: String,
    default: function () {
      return this.customer;
    },
  },
});

module.exports = mongoose.model("historyorders", orderHistorySchema);
