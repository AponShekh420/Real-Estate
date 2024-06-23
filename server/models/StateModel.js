const mongoose = require('mongoose');


// schema of state
const StateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: String,
  city: [
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

// module of state
const StateModel = mongoose.models.State || mongoose.model("State", StateSchema);

module.exports = StateModel;