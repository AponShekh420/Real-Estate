// import models
const AreaModel = require('../../models/AreaModel');
const CityModel = require('../../models/CityModel');
const StateModel = require('../../models/StateModel')
const CommunityModel = require('../../models/CommunityModel')


const deleteArea = async (req, res) => {
  const {areaId} = req.body

  try {
    const areaDeleteStatus = await AreaModel.findByIdAndDelete(areaId);

    // check: if the area has deleted successfully then we should remove this areaId from city and communtiy and make the area and community deactive
    if(areaDeleteStatus) {

      // update the city collection to delete this state id
      const cityUpdateStatus = await CityModel.updateMany({
        area: {
          $in: areaId
        }
      },
      {
        $pull: {
          area: areaId
        }
      }
    );

      // update the community collection to delete this state id
      const communtiyUpdateStatus = await CommunityModel.updateMany({area: areaId}, {
        area: null,
        active: false
      });

      console.log("cityUpdateStatus:", cityUpdateStatus)
      console.log("communtiyUpdateStatus:", communtiyUpdateStatus)
      // try to check those cities, areas, and communities has update or not
      if(cityUpdateStatus && communtiyUpdateStatus) {
        res.status(200).json({
          msg: "The area has deleted successfully"
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

module.exports = deleteArea;