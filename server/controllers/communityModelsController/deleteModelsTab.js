const CMTModel = require("../../models/CMTModel");
const deleteFileFromSpace = require("../../utils/deleteFileFromSpace ");
const deleteModelsTab = async (req, res) => {
  const { CMTId } = req.body;
  try {
    const modelsTabsDeleteStatus = await CMTModel.findByIdAndDelete(CMTId);
    if(modelsTabsDeleteStatus) {
      await deleteFileFromSpace('assets-upload', modelsTabsDeleteStatus.img);
      res.status(200).json({
        msg: "The model has delete succesfully"
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