const AreaModel = require("../../models/AreaModel");
const CityModel = require("../../models/CityModel");

const updateCity = async (req, res) => {
  
  try {
    const {name, desc, stateId, areaId, cityId } = req.body;
    const Area = await AreaModel.findByIdAndUpdate(areaId, {
      name,
      desc,
      state: stateId,
      city: cityId
    });

    // updating the state collection to add area in area field on state
    if(Area) {

      // remove the old state
      const OldArea = await CityModel.updateMany({
        area: {
          $in: areaId
        }
      }, {
        $pull: {
          area: areaId
        }
      })
      
      // adding the area in city
      if(OldArea) {
        const city = await CityModel.findByIdAndUpdate(cityId, {
          $push: {
            area: Area._id
          }
        })

        // check validation: is state has updated or not
        if(city) {
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