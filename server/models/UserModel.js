const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
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
      ref: 'Community'
    }
  ],
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Blog"
    }
  ],
  provider: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "viewer"
  },
  accountId: {
    type: String,
  },
  avatar: {
    type: String,
    default: "user_avatar.png"
  }
}, {timestamps: true});


const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = UserModel;