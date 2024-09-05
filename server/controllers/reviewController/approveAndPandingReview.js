const ReviewModel = require("../../models/ReviewModel");

const approveAndPandingReview = async (req, res) => {

  const {id} = req.params

  try {
    const Review = await ReviewModel.findById(id);
    if(Review) {
      if(Review.active) {
        Review.active = false;
        await Review.save();
        res.json({
          msg: "The review is pending approval.",
          active: Review.active
        })
      } else {
        Review.active = true;
        await Review.save();
        res.json({
          msg: "Review has been approved!",
          active: Review.active
        })
      }
    } else {
      res.status(404).json({
        errors: {
          notFound: {
            msg: "The data has not found"
          }
        }
      })
    }
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = approveAndPandingReview;