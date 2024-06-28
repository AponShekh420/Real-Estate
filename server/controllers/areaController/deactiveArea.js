const AreaModel = require('../../models/AreaModel');
const CommunityModel = require('../../models/CommunityModel');

const deactiveArea = async (req, res) => {
  const {areaId} = req.body;
  try {
    const deactiveArea = await AreaModel.findByIdAndUpdate(areaId, {
      active: false,
    });

    if(deactiveArea) {
      const communities = await CommunityModel.updateMany({area: areaId}, {
        active: false
      })
      if(communities) {
        res.status(200).json({
          msg: "The area has deactivated"
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

module.exports = deactiveArea;