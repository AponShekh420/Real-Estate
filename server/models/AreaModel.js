const mongoose = require('mongoose');


// schema of area
const AreaSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: String,
  state: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
    }
  ],
  city: [
    {
      type: mongoose.Types.ObjectId,
      default: []
    }
  ]
})


// model of area
const AreaModel = mongoose.models.Area || mongoose.model("Area", AreaSchema);



module.exports = AreaModel;