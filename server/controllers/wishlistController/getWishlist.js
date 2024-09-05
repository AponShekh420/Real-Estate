const WishlistModel = require('../models/../../models/WishlistModel');

const getWishlist = async (req, res) => {
  try {
    const wishlist = await WishlistModel.findOne({ userId: req?.user?._id }).populate({
      path: 'communities',
      populate: [
        { path: 'state', model: 'State' },
        { path: 'city', model: 'City' },
        { path: 'area', model: 'Area' }
      ]
    });
    
    if (!wishlist) {
      return res.status(404).json({
        errors: {
          notFound: {
            msg: 'Wishlist not found',
          }
        }
      });
    }

    res.status(200).json({
      msg: "Wishlist has founded",
      data: wishlist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: {
        server: {
          msg: 'Something went wrong. Please try again.',
        }
      }
    });
  }
};



module.exports = getWishlist;