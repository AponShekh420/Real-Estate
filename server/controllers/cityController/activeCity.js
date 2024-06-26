const AreaModel = require('../../models/AreaModel');
const CommunityModel = require('../../models/CommunityModel');
const CityModel = require('../../models/CityModel');
const StateModel = require('../../models/StateModel');

const activeCity = async (req, res) => {
  const {cityId} = req.body;
  try {

    const parents = await StateModel.findOne({
      city: {
        $in: cityId
      }
    });
    
    if(parents?.active) {
      const activeCityStatus = await CityModel.findByIdAndUpdate(cityId, {
        active: true,
      });
  
      if(activeCityStatus) {
        const activeAllAreaStatus = await AreaModel.updateMany({city: cityId}, {
          active: true
        })


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
        if(communities && activeAllAreaStatus) {
          res.status(200).json({
            msg: "The city has activated"
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
    } else {
      res.status(400).json({
        errors: {
          msg: "Take care of parents first"
        }
      })
    }
    
  } catch(err){
    console.log(err.message)
  }
}

module.exports = activeCity;