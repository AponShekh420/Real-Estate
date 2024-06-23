const CityModel = require("../../models/CityModel");
const StateModel = require("../../models/StateModel");

const updateCity = async (req, res) => {
  try {
    const {name, desc, stateId, cityId } = req.body;
    const City = await CityModel.findByIdAndUpdate(cityId, {
      name,
      desc,
      state: [...stateId]
    })

    // updating the state collection to add city in city field on state
    if(City) {

      // remove the old city of state
      const oldState = await StateModel.updateMany({
        city: {
          $in: cityId
        }
      }, {
        $pull: {
          city: cityId
        }
      })
      
      // adding the city in new state
      if(oldState) {
        const state = [];
        for(let eachId of stateId) {
          const eachState = await StateModel.findByIdAndUpdate(eachId, {
            $push: {
              city: City._id
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

module.exports = updateCity;