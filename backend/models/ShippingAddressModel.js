const mongoose = require("mongoose");

const shippingaddressSchema = new mongoose.Schema({
  customer_name: {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
  },
  customer_login: {
    customer_email: {
      type: String,
      required: true,
      unique: true,
    },
    customer_password: {
      type: String,
      required: true,
    },
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  dOb: {
    type: Date,
    required: true,
  },
  language: {
    type: String,
    enum: ["English", "Hindi", "Telugu", "Marathi", "Tamil"],
    required: true,
  },
  mobile: {
    type: Number,
  },
  customer_address: {
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
  },
  interests: [
    {
      Living: {
        type: Boolean,
        default: false,
      },
      Dining: {
        type: Boolean,
        default: false,
      },
      Bed: {
        type: Boolean,
        default: false,
      },
      Kitchen: {
        type: Boolean,
        default: false,
      },
    },
  ],
  _id: {
    type: String,
    default: function () {
      return this.customer_login.customer_email;
    },
  },
});

module.exports = mongoose.model("shippingaddress", shippingaddressSchema);
