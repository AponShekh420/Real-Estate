const AmenityModel = require("../../models/AmenityModel");


const getAmenities = async (req, res) => {
  try {
    const data = await AmenityModel.find();
    if(data) {
      res.status(200).json({
        data: data,
        msg: "Got all amenities"
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

module.exports = getAmenities;