const AreaModel = require("../../models/AreaModel");
const StateModel = require("../../models/StateModel");

const addArea = async (req, res) => {
  try {
    const {name, desc, stateId} = req.body;
    const Area = await AreaModel.insertMany({
      name,
      desc,
      state: [...stateId]
    })

    console.log(Area)
    // updating the state collection to add area in area field on state
    if(Area) {
      const state = await StateModel.findByIdAndUpdate(stateId, {
        $push: {
          area: [...stateId]
        }
      })

      // check validation: is state has updated or not
      if(state) {
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

module.exports = addArea;