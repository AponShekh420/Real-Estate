const AreaModel = require('../../models/AreaModel');
const CommunityModel = require('../../models/CommunityModel');
const CityModel = require('../../models/CityModel');

const activeCity = async (req, res) => {
  const {cityId} = req.body;
  try {

    const parents = await AreaModel.findOne({
      city: {
        $in: cityId
      }
    }).populate({path: "state"});
    
    if(parents?.active && parents?.state.active && (parents?.state !== null) && (parents?.area !== null)) {
      const activeAreaStatus = await CityModel.findByIdAndUpdate(cityId, {
        active: true,
      });
  
      if(activeAreaStatus) {
        const communities = await CommunityModel.updateMany({
          city: cityId,
          $and: [
            {
              state: {
                $ne: null
              }
            },
            {
              area: {
                $ne: null
              }
            }
          ]
        }, {
          active: true
        })
        if(communities) {
          res.status(200).json({
            msg: "The city has activated"
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

module.exports = activeCity;