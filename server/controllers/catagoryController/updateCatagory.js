const CatagoryModel = require("../../models/CatagoryModel");

// upload the state on database
const updateCatagory = async (req, res)=> {
  try {
    const {catagoryId, name } = req.body;


    // slug making
    const duplicateCatagory = await CatagoryModel.find({name, _id: {$ne: catagoryId}});
    const currentCatagory = await CatagoryModel.findById(catagoryId);

    let slug;
    if(name == currentCatagory?.name) {
      slug = currentCatagory.slug
    } else {
      if(duplicateCatagory.length > 0){
        slug = name.toLowerCase().trim().split(' ').join("-") + "-" + duplicateCatagory.length;
      } else {
        slug = name.toLowerCase().trim().split(' ').join("-");
      }
    }

    const status = await CatagoryModel.findByIdAndUpdate(catagoryId, {
      name,
      slug,
    })

    if(status) {
      res.status(200).json({
        msg: "The Catagory Has Updated Successfully"
      })
    } else {
      res.status(500).json({
        errors: {
          catagoryUpdate: {
            msg: "The catagory hasn't updated, please try again"
          }
        }
      })
    }
  } catch(err) {
    console.log(err.message)
  }
}


module.exports = updateCatagory;