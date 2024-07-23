const SubcatagoryModel = require("../../models/SubcatagoryModel");
const CatagoryModel = require("../../models/CatagoryModel");

const addSubcatagory = async (req, res) => {
  try {
    const {name, catagoryId } = req.body;

    // slug making
    const duplicateSubcatagory = await SubcatagoryModel.find({name});

    let slug;
    if(duplicateSubcatagory.length > 0){
      slug = name.toLowerCase().trim().split(' ').join("-") + "-" + duplicateSubcatagory.length;
    } else {
      slug = name.toLowerCase().trim().split(' ').join("-");
    }

    
    const subcatagory = await SubcatagoryModel.insertMany({
      slug,
      name,
      catagory: catagoryId
    })

    // updating the catagory collection to add subcatagory in subcatagory field on state
    if(subcatagory) {
      const catagory = await CatagoryModel.findByIdAndUpdate(catagoryId, {
          $push: {
            subcatagory: subcatagory[0]._id
          }
        })

      // check validation: is state has updated or not
      if(catagory) {
        res.status(200).json({
          msg: "The Subcatagory Has Added Successfully"
        })
      } else {
        res.status(500).json({
          errors: {
            subcatagoryUpdate: {
              msg: "The subcatagory has not added, please try again"
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

module.exports = addSubcatagory;