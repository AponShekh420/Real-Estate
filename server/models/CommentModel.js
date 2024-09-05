const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  blog: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Blog"
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
  }
}, {timestamps: true});


const CommentModel = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

module.exports = CommentModel;