const CatagoryModel = require("../../models/CatagoryModel");

// upload the state on database
const addCatagory = async (req, res)=> {
  try {
    const { name } = req.body;

    // slug making
    const duplicateCatagory = await CatagoryModel.find({name});

    let slug;
    if(duplicateCatagory.length > 0){
      slug = name.toLowerCase().trim().split(' ').join("-") + "-" + duplicateCatagory.length
    } else {
      slug = name.toLowerCase().trim().split(' ').join("-")
    }


    const State = new CatagoryModel({
      name,
      slug,
    })

    const status = await State.save();
    if(status) {
      res.status(200).json({
        msg: "The Catagory Has Added Successfully"
      })
    } else {
      res.status(500).json({
        errors: {
          locationUpdate: {
            msg: "The Catagory hasn't added, please try again"
          }
        }
      })
    }
  } catch(err) {
    console.log(err.message)
  }
}


module.exports = addCatagory;