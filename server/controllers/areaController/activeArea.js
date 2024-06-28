const AreaModel = require('../../models/AreaModel');
const CommunityModel = require('../../models/CommunityModel');
const CityModel = require('../../models/CityModel');

const activeArea = async (req, res) => {
  const {areaId} = req.body;
  try {

    const parents = await CityModel.findOne({
      area: {
        $in: areaId
      }
    }).populate({path: "state"});
    
    if(parents?.active && parents?.state.active && (parents?.state !== null) && (parents?.city !== null)) {
      const activeAreaStatus = await AreaModel.findByIdAndUpdate(areaId, {
        active: true,
      });
  
      if(activeAreaStatus) {
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
        if(communities) {
          res.status(200).json({
            msg: "The area has activated"
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
          server: {
            msg: "There was an server side error"
          }
        }
      })
    }
    
  } catch(err){
    console.log(err.message)
  }
}

module.exports = activeArea;