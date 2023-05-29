const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("subcategories", subcategorySchema);
