const CMTModel = require("../../models/CMTModel");
const deleteFileFromSpace = require("../../utils/deleteFileFromSpace");

const updateModelsTab = async (req, res) => {
  const { CMTId, CMTName, desc, img, squareFit, bedrooms, bathrooms, garage } =
    req.body;
  try {
    // The Image has updated when user had update the model
    const CMTUpdateStatus = await CMTModel.findByIdAndUpdate(CMTId, {
      name: CMTName,
      desc,
      img,
      squareFit: Number(squareFit),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      garage: Number(garage),
    });
    if (CMTUpdateStatus) {
      res.status(200).json({
        msg: "The Communtiy model has updated successfully",
      });
    } else {
      res.status(500).json({
        errors: {
          update: {
            msg: "The model hasn't updated, please try again",
          },
        },
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = updateModelsTab;
