const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  picture: {
    type: String,
  },
  favorites: {
    type: [String],
  },
  comments: {
    type: [Object],
  },
});
module.exports = mongoose.model("users", userSchema);
