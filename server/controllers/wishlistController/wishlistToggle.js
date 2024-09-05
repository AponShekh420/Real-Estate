const WishlistModel = require('../../models/WishlistModel');

const toggleWishlist = async (req, res) => {
  const { communityId } = req.body;

  try {
    let wishlist = await WishlistModel.findOne({ userId: req?.user?._id });

    if (!wishlist) {
      // If no wishlist exists for the user, create one and add the community
      wishlist = new WishlistModel({ userId: req?.user?._id, communities: [communityId] });
      await wishlist.save();
      return res.status(200).json({
        msg: 'Community added to wishlist.',
        wishlist,
      });
    }

    // Check if the community is already in the wishlist
    const communityIndex = wishlist.communities.indexOf(communityId);

    if (communityIndex > -1) {
      // Community is already in the wishlist, so remove it
      wishlist.communities.splice(communityIndex, 1);
      await wishlist.save();
      return res.status(200).json({
        msg: 'Community removed from wishlist.',
        wishlist,
      });
    } else {
      // Community is not in the wishlist, so add it
      wishlist.communities.push(communityId);
      await wishlist.save();
      return res.status(200).json({
        msg: 'Community added to wishlist.',
        wishlist,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Something went wrong. Please try again.',
    });
  }
};


module.exports = toggleWishlist;