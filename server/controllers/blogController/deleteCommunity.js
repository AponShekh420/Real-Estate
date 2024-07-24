const CommunityModel = require('../../models/CommunityModel')
const StateModel = require('../../models/StateModel')
const CityModel = require('../../models/CityModel')
const AreaModel = require('../../models/AreaModel')

const deleteCommunity = async (req, res) => {
  const {communityId} = req.body;

  try {
    const communityDeleteStatus = await CommunityModel.findByIdAndDelete(communityId);
    if(communityDeleteStatus) {
      // Delete the communtiy field from StateModel
      const stateUpdateStatus = await StateModel.updateOne({
        community: {
          $in: communityId,
        }
      },{
        $pull: {
          community: communityId,
        }
      });

      // Delete the communtiy field from CityModel
      const cityUpdateStatus = await CityModel.updateOne({
        community: {
          $in: communityId,
        }
      },{
        $pull: {
          community: communityId,
        }
      });

      // Delete the communtiy field from AreaModel
      const areaUpdateStatus = await AreaModel.updateOne({
        community: {
          $in: communityId,
        }
      },{
        $pull: {
          community: communityId,
        }
      });
  
      // if is done then, should send the response
      if(stateUpdateStatus && cityUpdateStatus && areaUpdateStatus) {
        res.status(200).json({
          msg: "The community has deleted successfully"
        })
      } else {
        res.status(500).json({
          errors: {
            locationUpdate: {
              msg: "Somehow this community has not deleted from location"
            }
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

module.exports = deleteCommunity;