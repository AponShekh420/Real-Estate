const ReviewModel = require("../../models/ReviewModel");

const updateReview = async (req, res) => {
  const {active, id, rating, review} = req.body;
  try {
    const ReviewObj = await ReviewModel.findByIdAndUpdate(id, {
      rating,
      review,
      active,
    })
    const status = await ReviewObj.save();
    if(status) {
      res.status(200).json({
        msg: "Thank you for update!"
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

module.exports = updateReview;
