const StateModel = require("../../models/StateModel");

// upload the state on database
const addState = async (req, res)=> {
  try {
    const {name, desc, active, abbreviation} = req.body;

    // slug making
    const duplicateState = await StateModel.find({name});

    let slug;
    if(duplicateState.length > 0){
      slug = name.toLowerCase().trim().split(' ').join("-") + "-" + duplicateState.length
    } else {
      slug = name.toLowerCase().trim().split(' ').join("-")
    }


    const State = new StateModel({
      name,
      slug,
      desc,
      active,
      abbreviation,
      img: req?.files[0]?.filename || "",
    })

    const status = await State.save();
    if(status) {
      res.status(200).json({
        msg: "The State Has Added Successfully"
      })
    } else {
      res.status(500).json({
        errors: {
          locationUpdate: {
            msg: "The State hasn't added, please try again"
          }
        }
      })
    }
  } catch(err) {
    console.log(err.message)
  }
}


module.exports = addState;