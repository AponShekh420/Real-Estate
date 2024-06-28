const CommunityModel = require('../../models/CommunityModel')

const activeCommunity = async (req, res) => {

  const {communityId} = req.body;

  try {
    const communityActiveStatus = await CommunityModel.updateOne({
      _id: communityId,
      state: {
        $ne: null
      },
      city: {
        $ne: null
      },
      area: {
        $ne: null
      }
    }, {
      active: true
    });


    if(communityActiveStatus.matchedCount > 0) {
      res.status(200).json({
        msg: "The Community has published"
      })
    } else {
      res.status(400).json({
        errors: {
          locationProblem: {
            msg: "Check the location etc and try again"
          }
        }
      })
    }
  } catch(err){
    console.log(err.message)
  }
}

module.exports = activeCommunity;