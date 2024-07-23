const mongoose = require('mongoose');


// schema of area
const SubcatagorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  catagory: {
    type: mongoose.Types.ObjectId,
    ref: "Catagory",
    required: true,
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId
    }
  ],
}, {timestamps: true})


// model of area
const SubcatagoryModel = mongoose.models.Subcatagory || mongoose.model("Subcatagory", SubcatagorySchema);



module.exports = SubcatagoryModel;