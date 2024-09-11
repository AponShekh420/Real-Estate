const mongoose = require("mongoose");
const crypto = require("crypto");

const subscribeSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
}, {timestamps: true});


const SubscribeModel = mongoose.models.Subscribe || mongoose.model("Subscribe", subscribeSchema);

module.exports = SubscribeModel;