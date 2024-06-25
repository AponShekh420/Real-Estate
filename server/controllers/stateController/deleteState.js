// import models
const AreaModel = require('../../models/AreaModel');
const CityModel = require('../../models/CityModel');
const StateModel = require('../../models/StateModel')
const CommunityModel = require('../../models/CommunityModel')


const deleteState = async (req, res) => {
  const {stateId} = req.body

  try {
    const stateDeleteStatus = await StateModel.findByIdAndDelete(stateId);

    // check: if the state has deleted successfully then we should remove this stateId from city, area, and communtiy and make the city, area and community deactive
    if(stateDeleteStatus) {

      // update the city collection to delete this state id
      const cityUpdateStatus = await CityModel.updateMany({state: stateId}, {
        state: null,
        active: false
      });

      // update the area collection to delete this state id
      const areaUpdateStatus = await AreaModel.updateMany({state: stateId}, {
        state: null,
        active: false
      });

      // update the community collection to delete this state id
      const communtiyUpdateStatus = await CommunityModel.updateMany({state: stateId}, {
        state: null,
        active: false
      });

      console.log("cityUpdateStatu:", cityUpdateStatus)
      console.log("areaUpdateStatus:", areaUpdateStatus)
      console.log("communtiyUpdateStatus:", communtiyUpdateStatus)
      // try to check those cities, areas, and communities has update or not
      if(cityUpdateStatus && communtiyUpdateStatus && areaUpdateStatus) {
        res.status(200).json({
          msg: "The state has deleted successfully"
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

module.exports = deleteState;