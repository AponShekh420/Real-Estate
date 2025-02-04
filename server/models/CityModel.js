const mongoose = require("mongoose");

// schema of city
const citySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    desc: String,
    state: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "State",
    },
    area: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Area",
    },
    community: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Community",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

// model of city
const CityModel = mongoose.models.City || mongoose.model("City", citySchema);

module.exports = CityModel;
