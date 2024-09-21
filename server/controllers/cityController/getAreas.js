const AreaModel = require("../../models/AreaModel");

// upload the state on database
const getAreas = async (req, res)=> {
  try {
    const areas = await AreaModel.find({active: true, community: { $exists: true, $ne: [] }}).sort({ createdAt: -1 }).populate("state");
    if(areas) {
      res.status(200).json({
        msg: "Got All Area",
        data: areas
      });
    } else {
      res.status(500).json({
        errors: {
          notFound: {
            msg: "No data found"
          }
        }
      })
    }

  } catch(err) {
    console.log(err.message)
  }
}


module.exports = getAreas;