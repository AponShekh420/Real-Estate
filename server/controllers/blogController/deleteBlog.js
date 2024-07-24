const BlogModel = require('../../models/BlogModel')
const CatagoryModel = require('../../models/CatagoryModel')
const SubcatagoryModel = require('../../models/SubcatagoryModel')

const deleteBlog = async (req, res) => {
  const {blogId} = req.body;

  try {
    const blogDeleteStatus = await BlogModel.findByIdAndDelete(blogId);
    if(blogDeleteStatus) {
      // Delete the blog field from catagory
      const catagoryUpdateStatus = await CatagoryModel.updateOne({
        blogs: {
          $in: blogId,
        }
      },{
        $pull: {
          blogs: blogId,
        }
      });

      // Delete the blog field from subcatagory
      const subcatagoryUpdateStatus = await SubcatagoryModel.updateOne({
        blogs: {
          $in: blogId,
        }
      },{
        $pull: {
          blogs: blogId,
        }
      });

      
  
      // if is done then, should send the response
      if(catagoryUpdateStatus && subcatagoryUpdateStatus) {
        res.status(200).json({
          msg: "The blog has deleted successfully"
        })
      } else {
        res.status(500).json({
          errors: {
            catagoryUpdate: {
              msg: "Somehow this blog has not deleted from location"
            }
          }
        })
      }

    } else {
      res.status(500).json({
        errors: {
          msg: "There was an server side error"
        }
      })
    }
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = deleteBlog;