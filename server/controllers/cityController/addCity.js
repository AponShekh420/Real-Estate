const AreaModel = require("../../models/AreaModel");
const CityModel = require("../../models/CityModel");


const addCity = async (req, res) => {
  try {
    const {name, desc, stateId, areaId} = req.body;
    const City = await CityModel.insertMany({
      name,
      desc,
      state: stateId,
      area: areaId
    });

    // updating the areaModel collection to add city in area field on areaModel
    if(City) {
      const area = await AreaModel.findByIdAndUpdate(areaId, {
        $push: {
          city: City[0]._id
        }
      })
      // check validation: is area has updated or not
      if(area) {
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