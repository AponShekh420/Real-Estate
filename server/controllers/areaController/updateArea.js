const AreaModel = require("../../models/AreaModel");
const StateModel = require("../../models/StateModel");

const updateArea = async (req, res) => {
  try {
    const {name, desc, stateId, areaId } = req.body;
    const Area = await AreaModel.findByIdAndUpdate(areaId, {
      name,
      desc,
      state: [...stateId]
    })

    // updating the state collection to add area in area field on state
    if(Area) {

      // remove the old state
      const oldState = await StateModel.updateMany({
        area: {
          $in: areaId
        }
      }, {
        $pull: {
          area: areaId
        }
      })
      // adding the area in new state
      if(oldState) {
        const state = [];
        for(let eachId of stateId) {
          const eachState = await StateModel.findByIdAndUpdate(eachId, {
            $push: {
              area: Area
            }
          })

          state.push(eachState)
        }

        // check validation: is state has updated or not
        if(state) {
          res.status(200).json({
            msg: "The Area Has updated Successfully"
          })
        } else {
          res.status(500).json({
            errors: {
              msg: "There was an server side error"
            }
          })
        }

      } else{
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

module.exports = updateArea;