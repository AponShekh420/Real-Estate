const mongoose = require("mongoose");

const CommunitySchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  website: String,
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  state: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "State"
  },
  city: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "City"
  },
  area: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Area"
  },
  zip: String,
  minPrice: {
    type: Number,
    required: true
  },
  maxPrice: {
    type: Number,
    required: true
  },
  homeTypes: [
    {
      type: String,
      required: true
    }
  ],
  communitySize: {
    type: Number,
    required: true
  },
  ageRestrictions: {
    type: Boolean,
    required: true
  },
  gated: {
    type: Boolean,
    required: true
  },
  builtStart: {
    type: String,
    required: true
  },
  builtEnd: {
    type: String,
    required: true
  },
  overview: {
    type: String
  },
  imgs: [
    {
      type: String,
      required: true
    }
  ],
  bedrooms: {
    type: Number,
    default: 0
  },
  bathrooms: {
    type: Number,
    default: 0
  },
  garages: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  },
  status: [
    {
      type: String,
      required: true
    }
  ],
  sqft: {
    type: Number,
    required: true
  },
  lat: Number,
  long: Number,
});


const CommunityModel = mongoose.models.Community || mongoose.model("Community", CommunitySchema);

module.exports = CommunityModel;