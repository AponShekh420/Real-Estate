const mongoose = require("mongoose");

const BuilderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
  },
  { timestamps: true }
);

const BuilderModel =
  mongoose.models.Builder || mongoose.model("Builder", BuilderSchema);

module.exports = BuilderModel;
