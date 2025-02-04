const mongoose = require("mongoose");

// schema of area
const areaSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: String,
    slug: {
      type: String,
      required: true,
    },
    state: {
      type: mongoose.Types.ObjectId,
      ref: "State",
      required: true,
    },
    city: [
      {
        type: mongoose.Types.ObjectId,
        default: [],
        ref: "City",
      },
    ],
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

// model of area
const AreaModel = mongoose.models.Area || mongoose.model("Area", areaSchema);

module.exports = AreaModel;
