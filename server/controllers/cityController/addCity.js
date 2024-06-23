const CityModel = require("../../models/CityModel");
const StateModel = require("../../models/StateModel");

const addCity = async (req, res) => {
  try {
    const {name, desc, stateId} = req.body;
    const City = await CityModel.insertMany({
      name,
      desc,
      state: [...stateId]
    })

    // updating the state collection to add area in area field on state
    if(City) {
      const state = [];
      for(let eachId of stateId) {
        const eachState = await StateModel.findByIdAndUpdate(eachId, {
          $push: {
            city: City[0]._id
          }
        })

        state.push(eachState)
      }

      // check validation: is state has updated or not
      if(state) {
        res.status(200).json({
          msg: "The City Has Added Successfully"
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

module.exports = addCity;