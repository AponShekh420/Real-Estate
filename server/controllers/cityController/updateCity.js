const AreaModel = require("../../models/AreaModel");
const CityModel = require("../../models/CityModel");
const CommunityModel = require("../../models/CommunityModel");
const StateModel = require("../../models/StateModel");
const deleteFileFromSpace = require("../../utils/deleteFileFromSpace ");


const updateCity = async (req, res) => {
  
  try {
    const {name, desc, stateId, areaId, cityId, active, abbreviation, oldImgUrl, uploadedImageChanged} = req.body;

    // slug making
    const duplicateCity = await CityModel.find({name, _id: {$ne: cityId}});
    const currentCity = await CityModel.findById(cityId);

    let slug;
    if(name == currentCity?.name) {
      slug = currentCity.slug
    } else {
      if(duplicateCity.length > 0){
        slug = name.toLowerCase().trim().split(' ').join("-") + "-" + duplicateCity.length;
      } else {
        slug = name.toLowerCase().trim().split(' ').join("-");
      }
    }


    const City = await CityModel.findByIdAndUpdate(cityId, {
      name,
      slug,
      active,
      desc,
      state: stateId,
      area: areaId,
      img: uploadedImageChanged ? req?.files[0]?.location : oldImgUrl,
      abbreviation
    });

    if(uploadedImageChanged) {
      if(oldImgUrl) {
        await deleteFileFromSpace('assets-upload', oldImgUrl);
      }
    }
    // updating the state collection to add area in area field on state
    if(City) {

      const communitisList = await CommunityModel.find({city: cityId}).select('_id');

       // change the state from communtiy
       const communityUpdateStatus = await CommunityModel.updateMany({city: cityId}, {
        area: areaId,
        state: stateId
      });

      // remove the old city and the communtiy from old city
      const OldArea = await AreaModel.updateMany({
        city: {
          $in: cityId
        }
      }, {
        $pull: {
          city: cityId
        },
        $pullAll: {
          community: communitisList
        }
      })


      // remove the old city of state
      const oldState = await StateModel.updateMany({
        _id: City.state
      }, 
      {
        $pullAll: {
          community: communitisList
        }
      })

      
      // adding the area in city
      if(OldArea && oldState && communitisList && communityUpdateStatus) {
        const area = await AreaModel.findByIdAndUpdate(areaId, {
          $push: {
            city: City._id,
            community: {
              $each: communitisList
            }
          }
        })

        // push community in new state community field or aray
        const state = await StateModel.findByIdAndUpdate(stateId, {
          $push: {
            community: {
              $each: communitisList
            }
          }
        })

        // check validation: is state has updated or not
        if(area && state) {
          res.status(200).json({
            msg: "The City Has updated Successfully"
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

      } else{
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

module.exports = updateCity;