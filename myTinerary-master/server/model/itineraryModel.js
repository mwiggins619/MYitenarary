const mongoose = require("mongoose");
const itinerarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique: true,
  },

  profile: {
    type: String,
    // required: true,
  },
  rating: {
    type: Number,
  },
  duration: {
    type: String,
  },
  price: {
    type: String,
  },
  hashtags: {
    type: [String],
  },
  activities: {
    type: [String],
  },
  favorites: {
    type: [String],
  },
  comments: {
    type: [Object],
  },
});
module.exports = mongoose.model("itinerary", itinerarySchema);
