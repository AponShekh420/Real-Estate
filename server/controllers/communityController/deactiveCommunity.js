const CommunityModel = require('../../models/CommunityModel');

const deactiveCommunity = async (req, res) => {
  const {communityId} = req.body;
  try {
    const deactiveCommunityStatus = await CommunityModel.findByIdAndUpdate(communityId, {
      active: false,
    });

    if(deactiveCommunityStatus) {
      res.status(200).json({
        msg: "The community has deactivated"
      })
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

module.exports = deactiveCommunity;