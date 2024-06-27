const mongoose = require('mongoose');


const CMTSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  shortDesc: {
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
  collectionType: String,
  sqft: Number,
  bed: Number,
  bath: Number,
  garage: Number
})


const CMTModel = mongoose.models.CMTModel || mongoose.model('CMTModel', CMTSchema);

module.exports = CMTModel;