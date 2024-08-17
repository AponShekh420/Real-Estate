const mongoose = require('mongoose');

const AmenitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
  },
  popular: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

const AmenityModel = mongoose.models.Amenity || mongoose.model("Amenity", AmenitySchema);

module.exports = AmenityModel;