const mongoose = require("mongoose");
const crypto = require("crypto");

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
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
}, {timestamps: true});



UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex")

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000 //10mins

  return resetToken
}


const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = UserModel;