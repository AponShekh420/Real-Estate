const CommentModel = require("../../models/CommentModel");

const addComment = async (req, res) => {
  const {blogId, text} = req.body;
  try {
    const CommentObj = new CommentModel({
      blog: blogId,
      user: req?.user?._id,
      text,
    });
    const status = await CommentObj.save();
    if(status) {
      res.status(200).json({
        msg: "Thank you for your Comment!"
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

module.exports = addComment;
