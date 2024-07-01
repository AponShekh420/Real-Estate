const mongoose = require('mongoose');


// schema of state
const StateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  desc: String,
  city: [
    {
      type: mongoose.Types.ObjectId,
      default: [],
      ref: "City",
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
  }
})

// module of state
const StateModel = mongoose.models.State || mongoose.model("State", StateSchema);

module.exports = StateModel;