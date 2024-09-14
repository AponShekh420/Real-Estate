const CityModel = require("../../models/CityModel");
const StateModel = require("../../models/StateModel");
const CommunityModel = require("../../models/CommunityModel");
const path = require("path");
const {unlink} = require('fs');


const updateCity = async (req, res) => {
  try {
    const {name, desc, stateId, cityId, abbreviation, active, oldImgUrl, uploadedImageChanged } = req.body;
    
    // slug making
    const duplicateCity = await CityModel.find({name, _id: {$ne: cityId}});
    const currentCity = await CityModel.findById(cityId);

    let slug;
    if(name === currentCity?.name) {
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
      abbreviation,
      desc,
      img: uploadedImageChanged ? req?.files[0]?.location : oldImgUrl,
      state: stateId
    })

    if(uploadedImageChanged) {
      if(oldImgUrl) {
        unlink(path.join(__dirname, `../../public/assets/location/${oldImgUrl}`), (err)=> {
          if(err) {
              console.log(err)
          }
        });
      }
    }


    // updating the state collection to add city in city field on state
    if(City) {

      const communitisList = await CommunityModel.find({city: cityId}).select('_id');


       // change the state from communtiy
      const communityUpdateStatus = await CommunityModel.updateMany({city: cityId}, {
        state: stateId
      });



      // remove the old city of state
      const oldState = await StateModel.updateMany({
        city: {
          $in: cityId
        }
      }, {
        $pull: {
          city: cityId,
        },
        $pullAll: {
          community: communitisList
        }
      })
      
      // adding the city in new state
      if(oldState && communitisList && communityUpdateStatus) {
        const state = await StateModel.findByIdAndUpdate(stateId, {
            $push: {
              city: City._id,
              community: {
                $each: communitisList
              }
            }
          })


        // check validation: is state has updated or not
        if(state) {
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