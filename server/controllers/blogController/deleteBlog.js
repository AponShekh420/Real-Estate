const BlogModel = require('../../models/BlogModel')
const CatagoryModel = require('../../models/CatagoryModel')
const deleteFileFromSpace = require('../../utils/deleteFileFromSpace');

const deleteBlog = async (req, res) => {
  const {blogId} = req.body;

  try {
    const blogDeleteStatus = await BlogModel.findByIdAndDelete(blogId);
    await deleteFileFromSpace('assets-upload', blogDeleteStatus?.img);
    if(blogDeleteStatus) {
      // Delete the blog field from catagory
      const catagoryUpdateStatus = await CatagoryModel.updateMany({
        blogs: {
          $in: blogId,
        }
      },{
        $pull: {
          blogs: blogId,
        }
      });

      
  
      // if is done then, should send the response
      if(catagoryUpdateStatus) {
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