const CityModel = require("../../models/CityModel");
const StateModel = require("../../models/StateModel");

const addCity = async (req, res) => {
  try {
    const {name, desc, stateId} = req.body;

    // slug making
    const duplicateArea = await CityModel.find({name});

    let slug;
    if(duplicateArea.length > 0){
      slug = name.toLowerCase().trim().split(' ') + "-" + duplicateArea.length
    } else {
      slug = name.toLowerCase().trim().split(' ')
    }

    
    const City = await CityModel.insertMany({
      slug,
      name,
      desc,
      state: stateId
    })

    // updating the state collection to add area in area field on state
    if(City) {
      const state = await StateModel.findByIdAndUpdate(stateId, {
          $push: {
            city: City[0]._id
          }
        })

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