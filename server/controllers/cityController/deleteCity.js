// import models
const AreaModel = require('../../models/AreaModel');
const CityModel = require('../../models/CityModel');
const StateModel = require('../../models/StateModel')
const CommunityModel = require('../../models/CommunityModel')


const deleteCity = async (req, res) => {
  const {cityId} = req.body

  try {
    const cityDeleteStatus = await CityModel.findByIdAndDelete(cityId);

    // check: if the state has deleted successfully then we should remove this stateId from city, area, and communtiy and make the city, area and community deactive
    if(cityDeleteStatus) {

      // update the city collection to delete this state id
      const stateUpdateStatus = await StateModel.updateMany({
        city: {
          $in: cityId
        }
      },
      {
        $pull: {
          city: cityId
        }
      }
    );

      // update the area collection to delete this state id
      const areaUpdateStatus = await AreaModel.updateMany({city: cityId}, {
        city: null,
        active: false
      });

      // update the community collection to delete this state id
      const communtiyUpdateStatus = await CommunityModel.updateMany({city: cityId}, {
        city: null,
        active: false
      });

      // try to check those cities, areas, and communities has update or not
      if(stateUpdateStatus && communtiyUpdateStatus && areaUpdateStatus) {
        res.status(200).json({
          msg: "The city has deleted successfully"
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
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = deleteCity;