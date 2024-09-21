const AreaModel = require("../../models/AreaModel");
const CityModel = require("../../models/CityModel");


const addCity = async (req, res) => {
  try {
    const {name, desc, stateId, areaId, active} = req.body;

    // slug making
    const duplicateCity = await CityModel.find({name: name});

    let slug;
    if(duplicateCity.length > 0){
      slug = name.toLowerCase().trim().split(' ').join("-") + "-" + duplicateCity.length;
    } else {
      slug = name.toLowerCase().trim().split(' ').join("-");
    }


    const City = await CityModel.insertMany({
      name,
      desc,
      active,
      state: stateId,
      area: areaId,
      img: req?.files ? req?.files[0]?.location : "",
      slug,
    });

    // updating the areaModel collection to add city in area field on areaModel
    if(City) {
      const city = await AreaModel.findByIdAndUpdate(areaId, {
        $push: {
          city: City[0]._id
        }
      })
      // check validation: is area has updated or not
      if(city) {
        res.status(200).json({
          msg: "The City Has Added Successfully"
        })
      } else {
        res.status(500).json({
          errors: {
            locationUpdate: {
              msg: "There was an server side error"
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

module.exports = addCity;