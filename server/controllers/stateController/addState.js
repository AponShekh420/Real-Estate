const StateModel = require("../../models/StateModel");

// upload the state on database
const addState = async (req, res)=> {
  try {
    const {name, desc} = req.body;
    const State = new StateModel({
      name,
      desc
    })

    const status = await State.save();
    if(status) {
      res.status(200).json({
        msg: "The State Has Added Successfully"
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


module.exports = addState;