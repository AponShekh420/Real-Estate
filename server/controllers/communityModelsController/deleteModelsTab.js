const path = require("path");
const CMTModel = require("../../models/CMTModel");
const {unlink} = require('fs');
const deleteModelsTab = async (req, res) => {
  const { CMTId } = req.body;
  try {
    const modelsTabsDeleteStatus = await CMTModel.findByIdAndDelete(CMTId);
    if(modelsTabsDeleteStatus) {
      unlink(path.join(__dirname, `../../public/assets/communityModels/${modelsTabsDeleteStatus.img}`), (err)=> {
        if(err) {
            console.log(err)
        } else {
          res.status(200).json({
            msg: "The model has delete succesfully"
          })
        }
      })
    } else {
      res.status(500).json({
        errors: {
          delete: {
            msg: "The model hasn't deleted, please try again"
          }
        }
      })
    }
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = deleteModelsTab;