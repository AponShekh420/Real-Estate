// import models
const SubcatagoryModel = require('../../models/SubcatagoryModel');
const CatagoryModel = require('../../models/CatagoryModel')
const BlogModel = require('../../models/BlogModel')


const deleteSubcatagory = async (req, res) => {
  const {subcatagoryId} = req.body

  try {
    const subcatagoryDeleteStatus = await SubcatagoryModel.findByIdAndDelete(subcatagoryId);

    // check: if the state has deleted successfully then we should remove this stateId from city, area, and communtiy and make the city, area and community deactive
    if(subcatagoryDeleteStatus) {

      // update the city collection to delete this state id
      const catagoryUpdateStatus = await CatagoryModel.updateMany({
        subcatagory: {
          $in: subcatagoryId
        }
      },
      {
        $pull: {
          subcatagory: subcatagoryId
        }
      }
    );

      // update the community collection to delete this state id
      const blogsUpdateStatus = await BlogModel.updateMany({subcatagory: subcatagoryId}, {
        subcatagory: null,
      });

      // try to check those cities, areas, and communities has update or not
      if(catagoryUpdateStatus && blogsUpdateStatus ) {
        res.status(200).json({
          msg: "The Subcatagory Has Deleted Successfully"
        })
      } else {
        res.status(500).json({
          errors: {
            locationUpdate: {
              msg: "There was an server side error"
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

module.exports = deleteSubcatagory;