// import models
const AreaModel = require('../../models/AreaModel');
const CityModel = require('../../models/CityModel');
const StateModel = require('../../models/StateModel')
const CommunityModel = require('../../models/CommunityModel')
const deleteFileFromSpace = require('../../utils/deleteFileFromSpace');

const deleteArea = async (req, res) => {
  const {areaId} = req.body

  try {
    const areaDeleteStatus = await AreaModel.findByIdAndDelete(areaId);

    // check: if the state has deleted successfully then we should remove this stateId from city, area, and communtiy and make the city, area and community deactive
    if(areaDeleteStatus) {

      // update the city collection to delete this state id
      const stateUpdateStatus = await StateModel.updateMany({
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

      // update the area collection to delete this state id
      const cityUpdateStatus = await CityModel.updateMany({area: areaId}, {
        area: null,
        active: false
      });

      // update the community collection to delete this state id
      const communtiyUpdateStatus = await CommunityModel.updateMany({area: areaId}, {
        area: null,
        active: false
      });

      // try to check those cities, areas, and communities has update or not
      if(stateUpdateStatus && communtiyUpdateStatus && cityUpdateStatus) {
        if(areaDeleteStatus?.img) {
          await deleteFileFromSpace('assets-upload', areaDeleteStatus.img);
          res.status(200).json({
            msg: "The Area has deleted successfully"
          })
        } else {
          res.status(200).json({
            msg: "The Area has deleted successfully"
          })
        }
      } else {
        res.status(500).json({
          errors: {
            locationUpdate: {
              msg: "There was an server side error"
            }
          }
        })
      }

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

module.exports = deleteArea;