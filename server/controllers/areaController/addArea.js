const AreaModel = require("../../models/AreaModel");
const StateModel = require("../../models/StateModel");

const addArea = async (req, res) => {
  try {
    const {name, desc, stateId, active} = req.body;

    // slug making
    const duplicateArea = await AreaModel.find({name});

    let slug;
    if(duplicateArea.length > 0){
      slug = name.toLowerCase().trim().split(' ').join("-") + "-" + duplicateArea.length;
    } else {
      slug = name.toLowerCase().trim().split(' ').join("-");
    }

    
    const Area = await AreaModel.insertMany({
      slug,
      active,
      name,
      desc,
      img: req?.files ? req?.files[0]?.location : "",
      state: stateId
    })

    // updating the state collection to add area in area field on state
    if(Area) {
      const state = await StateModel.findByIdAndUpdate(stateId, {
          $push: {
            area: Area[0]._id
          }
        })

      // check validation: is state has updated or not
      if(state) {
        res.status(200).json({
          msg: "The Area Has Added Successfully"
        })
      } else {
        res.status(500).json({
          errors: {
            locationUpdate: {
              msg: "The Area couldn't merge with the state, try again"
            }
          }
        })
      }

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

module.exports = addArea;