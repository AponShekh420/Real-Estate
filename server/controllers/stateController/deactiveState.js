const CommunityModel = require('../../models/CommunityModel');
const StateModel = require('../../models/StateModel');

const deactiveState = async (req, res) => {
  const {stateId} = req.body;
  try {
    const deactiveStateStatus = await StateModel.findByIdAndUpdate(stateId, {
      active: false,
    });

    if(deactiveStateStatus) {
      const communities = await CommunityModel.updateMany({state: stateId}, {
        active: false
      })
      if(communities) {
        res.status(200).json({
          msg: "The state has deactivated"
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
  } catch(err){
    console.log(err.message)
  }
}

module.exports = deactiveState;