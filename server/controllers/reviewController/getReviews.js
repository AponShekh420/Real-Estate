const ReviewModel = require("../../models/ReviewModel");

const getReviews = async (req, res) => {
  // const {status} = req.params;
  // const queryObj = status == "all" ? {} : {active: status == "active" ? true : false};

  // if(req.user.role !== "admin" && status !== "active") {
  //   res.status(403).json({
  //     errors: {
  //       login: {
  //         msg: "Sorry, You are not admin user"
  //       }
  //     }
  //   })
  // }

  const {communityId} = req.params;

  try {
    const data = await ReviewModel.find({active: true, community: communityId}).populate({
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
