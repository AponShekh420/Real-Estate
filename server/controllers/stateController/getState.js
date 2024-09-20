const StateModel = require("../../models/StateModel");

// upload the state on database
const getState = async (req, res)=> {
  const {status} = req.params;
  const validation = status != 'anytype' ? {active: status == "active" ? true : false} : {$or: [{active: true}, {active: false}]};
  try {
    const state = await StateModel.find(validation).sort({ createdAt: -1 }).populate({path: "area", populate: {path: "city"}})
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


module.exports = getState;