const StateModel = require("../../models/StateModel");

// upload the state on database
const getStatesOnlyWithCommunities = async (req, res)=> {
  try {
    const state = await StateModel.find({
      active: true,
      community: { $exists: true, $ne: [] } 
    }).sort({ createdAt: -1 }).select("name slug _id community");
    if(state) {
      res.status(200).json({
        message: "Got the all state",
        data: state
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

  } catch(err) {
    console.log(err.message)
  }
}


module.exports = getStatesOnlyWithCommunities;