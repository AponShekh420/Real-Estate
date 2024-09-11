const CommentModel = require("../../models/CommentModel");

const getComments = async (req, res) => {
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

  const {blogId} = req.params;

  try {
    const data = await CommentModel.find({blog: blogId}).sort({ createdAt: -1 }).populate({
      path: 'user',
      select: '-password',  // Exclude the password field
    }).populate("blog");


    if(data) {
      res.status(200).json({
        msg: "You got all comments!",
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

module.exports = getComments;
