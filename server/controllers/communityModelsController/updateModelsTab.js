const CMTModel = require("../../models/CMTModel");

const updateModelsTab = async (req, res) => {
  const {CMTId, CMTName, shortDesc, collectionType, sqft, bed, bath, garage} = req.body;
  try {
    const CMTUpdateStatus = await CMTModel.findByIdAndUpdate(CMTId, {
      name: CMTName,
      shortDesc,
      collectionType,
      sqft,
      bed,
      bath,
      img: "placeholader.jpg",
      garage
    })

    if(CMTUpdateStatus) {
      res.status(200).json({
        msg: "The Communtiy model has updated successfully"
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

module.exports = updateModelsTab;