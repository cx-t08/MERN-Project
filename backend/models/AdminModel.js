const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  admin_email: {
    type: String,
    required: true,
    unique: true,
  },
  admin_password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("admins", adminSchema);
