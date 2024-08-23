const mongoose = require('mongoose');


// schema of area
const citySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  abbreviation: {
    type: String,
    required: true
  },
  desc: String,
  slug: {
    type: String,
    required: true
  },
  state: {
    type: mongoose.Types.ObjectId,
    ref: "State",
    required: true,
  },
  area: [
    {
      type: mongoose.Types.ObjectId,
      default: [],
      ref: "Area"
    }
  ],
  community: [
    {
      type: mongoose.Types.ObjectId
    }
  ],
  active: {
    type: Boolean,
    default: true
  },
  img: {
    type: String,
  },
}, {timestamps: true})


// model of area
const CityModel = mongoose.models.City || mongoose.model("City", citySchema);



module.exports = CityModel;