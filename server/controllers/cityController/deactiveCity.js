const CommunityModel = require('../../models/CommunityModel');
const CityModel = require('../../models/CityModel');

const deactiveCity = async (req, res) => {
  const {cityId} = req.body;
  try {
    const deactiveCity = await CityModel.findByIdAndUpdate(cityId, {
      active: false,
    });

    if(deactiveCity) {
      const communities = await CommunityModel.updateMany({city: cityId}, {
        active: false
      })
      if(communities) {
        res.status(200).json({
          msg: "The city has deactivated"
        })
      } else {
        res.status(500).json({
          errors: {
            msg: "There was an server side error"
          }
        })
      }
    } else {
      res.status(500).json({
        errors: {
          msg: "There was an server side error"
        }
      })
    }
  } catch(err){
    console.log(err.message)
  }
}

module.exports = deactiveCity;