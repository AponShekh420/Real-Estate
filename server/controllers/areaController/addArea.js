const AreaModel = require("../../models/AreaModel");
const CityModel = require("../../models/CityModel");


const addArea = async (req, res) => {
  try {
    const {name, desc, stateId, cityId} = req.body;

    // slug making
    const duplicateArea = await AreaModel.find({name: name});

    let slug;
    if(duplicateArea.length > 0){
      slug = name.toLowerCase().trim().split(' ') + "-" + duplicateArea.length
    } else {
      slug = name.toLowerCase().trim().split(' ')
    }


    const Area = await AreaModel.insertMany({
      name,
      desc,
      state: stateId,
      city: cityId,
      slug,
    });

    // updating the areaModel collection to add city in area field on areaModel
    if(Area) {
      const city = await CityModel.findByIdAndUpdate(cityId, {
        $push: {
          area: Area[0]._id
        }
      })
      // check validation: is area has updated or not
      if(city) {
        res.status(200).json({
          msg: "The Area Has Added Successfully"
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