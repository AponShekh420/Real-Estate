const SubcatagoryModel = require("../../models/SubcatagoryModel");
const CatagoryModel = require("../../models/CatagoryModel");
const BlogModel = require("../../models/BlogModel");

const updateSubcatagory = async (req, res) => {
  try {
    const {name, catagoryId, subcatagoryId } = req.body;
    
    // slug making
    const duplicateSubcatagory = await SubcatagoryModel.find({name, _id: {$ne: subcatagoryId}});
    const currentSubcatagory = await SubcatagoryModel.findById(subcatagoryId);

    let slug;
    if(name === currentSubcatagory?.name) {
      slug = currentSubcatagory.slug
    } else {
      if(duplicateSubcatagory.length > 0){
        slug = name.toLowerCase().trim().split(' ').join("-") + "-" + duplicateSubcatagory.length;
      } else {
        slug = name.toLowerCase().trim().split(' ').join("-");
      }
    }

    const subcatagory = await SubcatagoryModel.findByIdAndUpdate(subcatagoryId, {
      name,
      slug,
      catagory: catagoryId
    });

    // updating the catagory collection to add subcatagory in subcatagory field on catagory
    if(subcatagory) {

      const blogsList = await BlogModel.find({subcatagory: subcatagoryId}).select('_id');


       // change the catagory from blogs
      const blogUpdateUpdateStatus = await BlogModel.updateMany({subcatagory: subcatagoryId}, {
        catagory: catagoryId
      });



      // remove the old subcatagory of parent catagory
      const oldCatagory = await CatagoryModel.updateMany({
        subcatagory: {
          $in: subcatagoryId
        }
      }, {
        $pull: {
          subcatagory: subcatagoryId,
        },
        $pullAll: {
          blogs: blogsList
        }
      })
      
      // adding the subcatagory in new parent catagory
      if(oldCatagory && blogsList && blogUpdateUpdateStatus) {
        const catagory = await CatagoryModel.findByIdAndUpdate(catagoryId, {
            $push: {
              subcatagory: subcatagory._id,
              blogs: {
                $each: blogsList
              }
            }
          })


        // check validation: is parent catagory has updated or not
        if(catagory) {
          res.status(200).json({
            msg: "The Subcatagory Has updated Successfully"
          })
        } else {
          res.status(500).json({
            errors: {
              subcatagoryUpdate: {
                msg: "There was an server side error"
              }
            }
          })
        }

      } else{
        res.status(500).json({
          errors: {
            subcatagoryUpdate: {
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

module.exports = updateSubcatagory;