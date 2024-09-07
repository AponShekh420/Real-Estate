const CityModel = require("../../models/CityModel");

// upload the state on database
const getCities = async (req, res)=> {
  try {
    const cities = await CityModel.find({active: true, community: { $exists: true, $ne: [] }}).populate("state");
    if(cities) {
      res.status(200).json({
        msg: "Got All Cities",
        data: cities
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


module.exports = getCities;