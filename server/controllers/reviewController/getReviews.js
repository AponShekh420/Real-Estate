const mongoose = require("mongoose");
const ReviewModel = require("../../models/ReviewModel");

const getReviews = async (req, res) => {
  const { communityId } = req.params;

  // Validate communityId
  if (!mongoose.Types.ObjectId.isValid(communityId)) {
    return res.status(400).json({
      errors: {
        communityId: {
          msg: "Invalid community ID.",
        },
      },
    });
  }

  try {
    const data = await ReviewModel.find({
      active: true,
      community: communityId,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password", // Exclude the password field
      })
      .populate("community");

    if (data && data.length > 0) {
      res.status(200).json({
        msg: "You got all reviews!",
        data: data,
      });
    } else {
      res.status(404).json({
        errors: {
          reviews: {
            msg: "No reviews found for this community.",
          },
        },
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      errors: {
        server: {
          msg: "An error occurred while fetching reviews.",
        },
      },
    });
  }
};

module.exports = getReviews;
