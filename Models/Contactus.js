let mongoose = require("mongoose");

let ContactusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  service: {
    type: String,
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model("contactus", ContactusSchema);
