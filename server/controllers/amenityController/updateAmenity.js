const AmenityModel = require("../../models/AmenityModel");


const updateAmenity = async (req, res) => {

  const {name, icon, popular, id} = req.body;

  try {
    const status = await AmenityModel.findByIdAndUpdate(id, {
      name,
      icon,
      popular
    })
    if(status) {
      res.status(200).json({
        msg: "The amenity has updated successfully"
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

module.exports = updateAmenity;