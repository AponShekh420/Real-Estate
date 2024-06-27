const CMTModel = require("../../models/CMTModel");

const deleteModelsTab = async (req, res) => {
  const { CMTId } = req.body;
  try {
    const modelsTabsDeleteStatus = await CMTModel.findByIdAndDelete(CMTId);
    if(modelsTabsDeleteStatus) {
      res.status(200).json({
        msg: "The model has delete succesfully"
      })
    } else {
      res.status(500).json({
        errors: {
          msg: "There was an server side error"
        }
      })
    }
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = deleteModelsTab;