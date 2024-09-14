const StateModel = require("../../models/StateModel");
const path = require("path");
const {unlink} = require('fs');

// upload the state on database
const updateState = async (req, res)=> {
  try {
    const {stateId, name, desc, active, abbreviation, oldImgUrl, uploadedImageChanged} = req.body;


    // slug making
    const duplicateState = await StateModel.find({name, _id: {$ne: stateId}});
    const currentState = await StateModel.findById(stateId);

    let slug;
    if(name == currentState?.name) {
      slug = currentState.slug
    } else {
      if(duplicateState.length > 0){
        slug = name.toLowerCase().trim().split(' ').join("-") + "-" + duplicateState.length;
      } else {
        slug = name.toLowerCase().trim().split(' ').join("-");
      }
    }

    const status = await StateModel.findByIdAndUpdate(stateId, {
      name,
      desc,
      slug,
      active,
      abbreviation,
      img: uploadedImageChanged ? req?.files[0]?.location : oldImgUrl,
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

    if(status) {
      res.status(200).json({
        msg: "The State Has Updated Successfully"
      })
    } else {
      res.status(500).json({
        errors: {
          locationUpdate: {
            msg: "The state hasn't updated, please try again"
          }
        }
      })
    }
  } catch(err) {
    console.log(err.message)
  }
}


module.exports = updateState;