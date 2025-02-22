const mongoose = require("mongoose");

// schema of state
const StateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    abbreviation: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    desc: String,
    area: [
      {
        type: mongoose.Types.ObjectId,
        default: [],
        ref: "Area",
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

// module of state
const StateModel =
  mongoose.models.State || mongoose.model("State", StateSchema);

module.exports = StateModel;
