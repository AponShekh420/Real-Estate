const CatagoryModel = require("../../models/CatagoryModel");

// upload the state on database
const getCatagories = async (req, res)=> {
  // const {status} = req.params;
  // const validation = status != 'anytype' ? {active: status == "active" ? true : false} : {$or: [{active: true}, {active: false}]};
  try {
    const catagories = await CatagoryModel.find().sort({ createdAt: -1 }).populate({path: "subcatagory"})
    if(catagories) {
      res.status(200).json({
        message: "Got the all Catagories",
        data: catagories
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


module.exports = getCatagories;