const StateModel = require("../../models/StateModel");

// upload the state on database
const updateState = async (req, res)=> {
  try {
    const {stateId, name, desc} = req.body;
    const status = await StateModel.findByIdAndUpdate(stateId, {
      name,
      desc
    })

    if(status) {
      res.status(200).json({
        msg: "The State Has Updated Successfully"
      })
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


module.exports = updateState;