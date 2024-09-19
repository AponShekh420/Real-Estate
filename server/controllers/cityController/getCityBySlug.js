const CityModel = require("../../models/CityModel");

// upload the city on database
const getCityBySlug = async (req, res)=> {
  const {active, slug} = req.body;
  const validation = {
    active,
    slug,
  };

  try {
    const city = await CityModel.findOne(validation);
    if(city) {
      res.status(200).json({
        message: "Got the city data",
        data: city
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


module.exports = getCityBySlug;