const AreaModel = require("../../models/AreaModel");
const CityModel = require("../../models/CityModel");

const updateCity = async (req, res) => {
  
  try {
    const {name, desc, stateId, areaId, cityId } = req.body;
    const City = await CityModel.findByIdAndUpdate(cityId, {
      name,
      desc,
      state: stateId,
      area: areaId
    });

    // updating the state collection to add area in area field on state
    if(City) {

      // remove the old state
      const OldArea = await AreaModel.updateMany({
        city: {
          $in: cityId
        }
      }, {
        $pull: {
          city: cityId
        }
      })
      
      // adding the area in new state
      if(OldArea) {
        const area = await AreaModel.findByIdAndUpdate(areaId, {
          $push: {
            city: City._id
          }
        })

        // check validation: is state has updated or not
        if(area) {
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