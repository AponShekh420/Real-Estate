const StateModel = require("../../models/StateModel");

// upload the state on database
const addState = async (req, res)=> {
  try {
    const {name, desc} = req.body;

    // slug making
    const duplicateArea = await StateModel.find({name});

    let slug;
    if(duplicateArea.length > 0){
      slug = name.toLowerCase().trim().split(' ') + "-" + duplicateArea.length
    } else {
      slug = name.toLowerCase().trim().split(' ')
    }


    const State = new StateModel({
      name,
      slug,
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