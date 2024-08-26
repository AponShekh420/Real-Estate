const ReviewModel = require("../../models/ReviewModel");

const getReviews = async (req, res) => {
  const {status} = req.params;
  const queryObj = status == "all" ? {} : {active: status == "active" ? true : false}
  console.log(queryObj)
  try {
    const data = await ReviewModel.find(queryObj);
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
