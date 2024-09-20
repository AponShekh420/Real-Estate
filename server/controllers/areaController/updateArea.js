const AreaModel = require("../../models/AreaModel");
const StateModel = require("../../models/StateModel");
const CommunityModel = require("../../models/CommunityModel");
const path = require("path");
const {unlink} = require('fs');
const deleteFileFromSpace = require("../../utils/deleteFileFromSpace");


const updateArea = async (req, res) => {
  try {
    const {name, desc, stateId, areaId, abbreviation, active, oldImgUrl, uploadedImageChanged } = req.body;
    
    // slug making
    const duplicateArea = await AreaModel.find({name, _id: {$ne: areaId}});
    const currentArea = await AreaModel.findById(areaId);

    let slug;
    if(name === currentArea?.name) {
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
      active,
      abbreviation,
      desc,
      img: uploadedImageChanged ? req?.files[0]?.location : oldImgUrl,
      state: stateId
    })


    
    if(uploadedImageChanged) {
      if(oldImgUrl) {
        await deleteFileFromSpace('assets-upload', oldImgUrl);
      }
    }


    // updating the state collection to add city in city field on state
    if(Area) {

      const communitisList = await CommunityModel.find({area: areaId}).select('_id');


       // change the state from communtiy
      const communityUpdateStatus = await CommunityModel.updateMany({area: areaId}, {
        state: stateId
      });



      // remove the old city of state
      const oldState = await StateModel.updateMany({
        area: {
          $in: areaId
        }
      }, {
        $pull: {
          area: areaId,
        },
        $pullAll: {
          community: communitisList
        }
      })
      
      // adding the city in new state
      if(oldState && communitisList && communityUpdateStatus) {
        const state = await StateModel.findByIdAndUpdate(stateId, {
            $push: {
              area: Area._id,
              community: {
                $each: communitisList
              }
            }
          })


        // check validation: is state has updated or not
        if(state) {
          res.status(200).json({
            msg: "The Area Has updated Successfully"
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

module.exports = updateArea;