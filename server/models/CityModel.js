const mongoose = require('mongoose');


// schema of city
const CitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: String,
  state: [
    {
      type: mongoose.Types.ObjectId,
      required: true
    }
  ],
  area: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
    }
  ]
})


// model of city
const CityModel = mongoose.models.Area || mongoose.model("Area", CitySchema);


module.exports = CityModel;
