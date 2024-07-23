const mongoose = require('mongoose');


// schema of state
const CatagorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  subcatagory: [
    {
      type: mongoose.Types.ObjectId,
      default: [],
      ref: "Subcatagory",
    }
  ],
  blogs: [
    {
      type: mongoose.Types.ObjectId
    }
  ],
}, {timestamps: true})

// module of state
const CatagoryModel = mongoose.models.Catagory || mongoose.model("Catagory", CatagorySchema);

module.exports = CatagoryModel;