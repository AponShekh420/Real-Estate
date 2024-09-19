const AreaModel = require('../../models/AreaModel');
const CommunityModel = require('../../models/CommunityModel');
const CityModel = require('../../models/CityModel');
const StateModel = require('../../models/StateModel');

const activeArea = async (req, res) => {
  const {areaId} = req.body;
  try {

    const parents = await StateModel.findOne({
      area: {
        $in: areaId
      }
    });
    
    if(parents?.active) {
      const activeAreaStatus = await AreaModel.findByIdAndUpdate(areaId, {
        active: true,
      });
  
      if(activeAreaStatus) {
        const activeAllCityStatus = await CityModel.updateMany({area: areaId}, {
          active: true
        })


        const communities = await CommunityModel.updateMany({
          area: areaId,
          $and: [
            {
              state: {
                $ne: null
              }
            },
            {
              city: {
                $ne: null
              }
            }
          ]
        }, {
          active: true
        })
        if(communities && activeAllCityStatus) {
          res.status(200).json({
            msg: "The Area has activated"
          })
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
            locationUpdate: {
              msg: "There was an server side error"
            }
          }
        })
      }
    } else {
      res.status(400).json({
        errors: {
          locationUpdate: {
            msg: "Take care of parents first"
          }
        }
      })
    }
    
  } catch(err){
    console.log(err.message)
  }
}

module.exports = activeArea;