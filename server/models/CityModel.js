const mongoose = require('mongoose');


// schema of area
const citySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: String,
  state: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  area: [
    {
      type: mongoose.Types.ObjectId,
      default: []
    }
  ]
})


// model of area
const CityModel = mongoose.models.City || mongoose.model("City", citySchema);



module.exports = CityModel;