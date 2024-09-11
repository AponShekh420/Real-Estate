const ReviewModel = require("../../models/ReviewModel");

const getReviews = async (req, res) => {

  const {communityId} = req.params;

  try {
    const data = await ReviewModel.find({active: true, community: communityId}).sort({ createdAt: -1 }).populate({
      path: 'user',
      select: '-password',  // Exclude the password field
    }).populate("community");


    if(data) {
      res.status(200).json({
        msg: "You got all reviews!",
        data: data
      })
    } else {
      res.status(500).json({
        errors: {
          server: {
            msg: "There was an server side error"
          }
        }
      })
    }
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = getReviews;
