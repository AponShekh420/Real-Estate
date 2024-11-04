// import models
const CatagoryModel = require('../../models/CatagoryModel');
const SubcatagoryModel = require('../../models/SubcatagoryModel');
const BlogModel = require('../../models/BlogModel')


const deleteCatagory = async (req, res) => {
  const {catagoryId} = req.body

  try {
    const catagoryDeleteStatus = await CatagoryModel.findByIdAndDelete(catagoryId);

    // check: if the state has deleted successfully then we should remove this stateId from city, area, and communtiy and make the city, area and community deactive
    if(catagoryDeleteStatus) {

      // update the city collection to delete this state id
      const subcatagoryUpdateStatus = await SubcatagoryModel.updateMany({catagory: catagoryId}, {
        catagory: null,
      });

      // move all blogs to uncategorized
      const existingCatagoryBlogs = await BlogModel.find({catagory: catagoryId});

      const uncategorized = await CatagoryModel.findByIdAndUpdate(process.env.uncategorizedId, {
        $push: {
          blogs: existingCatagoryBlogs
        }
      })


      // update the community collection to delete this state id
      const blogUpdateStatus = await BlogModel.updateMany({catagory: catagoryId}, {
        catagory: process.env.uncategorizedId,
      }, {new: true});


      // try to check those cities, areas, and communities has update or not
      if(subcatagoryUpdateStatus && blogUpdateStatus) {
        res.status(200).json({
          msg: "The catagory has deleted successfully"
        })
      } else {
        res.status(500).json({
          errors: {
            locationUpdate: {
              msg: "The catagory hasn't deleted, please try again"
            }
          }
        })
      }

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

module.exports = deleteCatagory;