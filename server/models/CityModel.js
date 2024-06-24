const mongoose = require('mongoose');


// schema of area
const citySchema = mongoose.Schema({
  name: {
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
    required: true,
  },
  area: [
    {
      type: mongoose.Types.ObjectId,
      default: []
    }
  ],
  community: [
    {
      type: mongoose.Types.ObjectId
    }
  ]
})


// model of area
const CityModel = mongoose.models.City || mongoose.model("City", citySchema);



module.exports = CityModel;