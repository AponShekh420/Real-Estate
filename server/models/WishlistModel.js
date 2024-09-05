const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  communities: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Community',
    }
  ],
}, { timestamps: true });

const WishlistModel = mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);

module.exports = WishlistModel;