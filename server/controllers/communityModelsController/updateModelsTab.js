const { unlink } = require("fs");
const CMTModel = require("../../models/CMTModel");
const path = require('path');
const updateModelsTab = async (req, res) => {
  const {CMTId, CMTName, desc, oldImgUrl, uploadedImageChanged} = req.body;
  try {
    // The Image has updated when user had update the model
    const CMTUpdateStatus = await CMTModel.findByIdAndUpdate(CMTId, {
      name: CMTName,
      desc,
      img: uploadedImageChanged ? req.files[0].filename : oldImgUrl,
    });

    if(uploadedImageChanged) {
      unlink(path.join(__dirname, `../../public/assets/communityModels/${oldImgUrl}`), (err)=> {
        if(err) {
            console.log(err)
        }
      });
    }

    if(CMTUpdateStatus) {
      res.status(200).json({
        msg: "The Communtiy model has updated successfully"
      })
    } else {
      res.status(500).json({
        errors: {
          update: {
            msg: "The model hasn't updated, please try again"
          }
        }
      })
    }
  } catch(err){
    console.log(err.message)
  }
}

module.exports = updateModelsTab;