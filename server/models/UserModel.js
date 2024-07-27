const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  wishlist: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Wishlist'
    }
  ],
  blogs: {
    type: mongoose.Types.ObjectId,
    ref: "Blog"
  },
}, {timestamps: true});


const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = UserModel;