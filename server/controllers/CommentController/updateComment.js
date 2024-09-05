const CommentModel = require("../../models/CommentModel");

const updateComment = async (req, res) => {
  const {id, text} = req.body;
  try {
    const CommentObj = await CommentModel.findByIdAndUpdate(id, {
      text,
    })
    const status = await CommentObj.save();
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

module.exports = updateComment;
