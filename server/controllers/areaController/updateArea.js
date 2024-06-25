const AreaModel = require("../../models/AreaModel");
const CityModel = require("../../models/CityModel");

const updateArea = async (req, res) => {
  
  try {
    const {name, desc, stateId, areaId, cityId } = req.body;

    // slug making
    const duplicateArea = await AreaModel.find({name, _id: {$ne: areaId}});
    const currentArea = await AreaModel.findById(areaId);

    let slug;
    if(name === currentArea.name) {
      slug = currentArea.slug
    } else {
      if(duplicateArea.length > 0){
        slug = name.toLowerCase().trim().split(' ').join("-") + "-" + duplicateArea.length;
      } else {
        slug = name.toLowerCase().trim().split(' ').join("-");
      }
    }


    const Area = await AreaModel.findByIdAndUpdate(areaId, {
      name,
      slug,
      active: true,
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

        // change the state from communtiy
        const communityUpdateStatus = await CommunityModel.updateMany({area: areaId}, {
          state: stateId,
          city: cityId,
        });


        // check validation: is state has updated or not
        if(city && communityUpdateStatus) {
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