const BlogModel = require("../../models/BlogModel");

const getSingleBlog = async (req, res) => {
  const {slug} = req.params
  try {
    const singleBlog = await BlogModel.findOne({slug}).populate({path: "catagory"}).populate({path: "subcatagory"}).populate({path: "auther", select: "-password"})
    if(singleBlog) {
      res.status(200).json({
        message: "Blog has fetched successfully",
        data: singleBlog
      })
    } else {
      res.status(404).json({
        errors: {
          notFound: {
            msg: "The blog has not founded"
          }
        }
      })
    }
  } catch(err){
    console.log(err.message)
  }
}

module.exports = getSingleBlog;