const ReviewModel = require("../../models/ReviewModel");

const addReview = async (req, res) => {
  const {communityId, rating, review} = req.body;
  try {
    const ReviewObj = new ReviewModel({
      community: communityId,
      user: req?.user?.id,
      rating,
      review,
    });
    const status = await ReviewObj.save();
    if(status) {
      res.status(200).json({
        msg: "Thank you for your feedback!"
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

module.exports = addReview;
