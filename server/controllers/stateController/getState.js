const StateModel = require("../../models/StateModel");

// upload the state on database
const getState = async (req, res)=> {
  try {
    const state = await StateModel.find().populate({path: "city", populate: {path: "area"}})
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