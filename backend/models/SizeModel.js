const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  material: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("sizes", sizeSchema);
