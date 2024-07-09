const mongoose = require('mongoose');


const CMTSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  community: {
    type: mongoose.Types.ObjectId,
    ref: "Community",
    required: true
  },
  img: {
    type: String,
    required: true
  },
}, {timestamps: true})


const CMTModel = mongoose.models.CMTModel || mongoose.model('CMTModel', CMTSchema);

module.exports = CMTModel;