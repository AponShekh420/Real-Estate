const mongoose = require("mongoose");

const CMTSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    community: {
      type: mongoose.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    squareFit: {
      type: Number,
    },
    bedrooms: {
      type: Number,
    },
    bathrooms: {
      type: Number,
    },
    garage: {
      type: Number,
    },
  },
  { timestamps: true }
);

const CMTModel =
  mongoose.models.CMTModel || mongoose.model("CMTModel", CMTSchema);

module.exports = CMTModel;
