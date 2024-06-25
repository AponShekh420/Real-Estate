const mongoose = require('mongoose');


// schema of city
const AreaSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  desc: String,
  state: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  city: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  community: [
    {
      type: mongoose.Types.ObjectId
    }
  ],
  active: {
    type: Boolean,
    default: true
  }
})


// model of city
const AreaModel = mongoose.models.Area || mongoose.model("Area", AreaSchema);


module.exports = AreaModel;

