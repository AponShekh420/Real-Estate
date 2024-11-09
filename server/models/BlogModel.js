const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  metaTitle: {
    type: String,
  },
  metaDesc: {
    type: String,
  },
  desc: {
    type: String,
    required: true
  },
  catagory: [
    {
      type: mongoose.Types.ObjectId,
      default: [process.env.uncategorizedId],
      ref: "Catagory"
    }
  ],
  img: {
      type: String,
      required: true
  },
  active: {
    type: Boolean,
    default: false,
  },
  auther: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User"
  }
}, {timestamps: true});


const BlogModel = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

module.exports = BlogModel;