const AmenityModel = require("../../models/AmenityModel");


const deleteAmenity = async (req, res) => {
  const {id} = req.body;
  try {
    const status = await AmenityModel.findByIdAndDelete(id)
    if(status) {
      res.status(200).json({
        msg: "The amenity has deleted successfully"
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

module.exports = deleteAmenity;