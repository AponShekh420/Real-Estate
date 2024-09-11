const ReviewModel = require("../../models/ReviewModel");

const getAllReviews = async (req, res) => {

  try {
    const data = await ReviewModel.find().sort({ createdAt: -1 }).populate({
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

module.exports = getAllReviews;
