const CMTModel = require("../../models/CMTModel");

const addModelsTab = async (req, res) => {
  const {communityId, CMTName, shortDesc, collectionType, sqft, bed, bath, garage} = req.body;
  try {
    const CMTUpload = new CMTModel({
      name: CMTName,
      community: communityId,
      shortDesc,
      collectionType,
      sqft,
      bed,
      bath,
      img: "placeholader.jpg",
      garage
    });
    
    const CMTUploadStatus = await CMTUpload.save();

    if(CMTUploadStatus) {
      res.status(200).json({
        msg: "The Communtiy model has uploaded successfully"
      })
    } else {
      res.status(500).json({
        errors: {
          msg: "There was an server side error"
        }
      })
    }
  } catch(err){
    console.log(err.message)
  }
}

module.exports = addModelsTab;