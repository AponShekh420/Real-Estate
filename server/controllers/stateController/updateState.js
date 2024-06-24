const StateModel = require("../../models/StateModel");

// upload the state on database
const updateState = async (req, res)=> {
  try {
    const {stateId, name, desc} = req.body;

    // slug making
    const duplicateArea = await StateModel.find({name});

    let slug;
    if(duplicateArea.length > 0){
      slug = name.toLowerCase().trim().split(' ') + "-" + duplicateArea.length
    } else {
      slug = name.toLowerCase().trim().split(' ')
    }


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