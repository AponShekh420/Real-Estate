const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  rating: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  community: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Community"
  },
  like: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: []
    }
  ],
  dislike: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: []
    }
  ],
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User"
  },
  active: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});


const ReviewModel = mongoose.models.Review || mongoose.model("Review", reviewSchema);

module.exports = ReviewModel;