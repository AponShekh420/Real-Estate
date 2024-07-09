const CMTModel = require("../../models/CMTModel");

const updateModelsTab = async (req, res) => {
  const {CMTId, CMTName, desc, img} = req.body;
  try {
    const CMTUpdateStatus = await CMTModel.findByIdAndUpdate(CMTId, {
      name: CMTName,
      desc,
      img,
    })

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