const CMTModel = require("../../models/CMTModel");

const addModelsTab = async (req, res) => {
  const {
    communityId,
    CMTName,
    desc,
    img,
    squareFit,
    bedrooms,
    bathrooms,
    garage,
  } = req.body;

  try {
    const CMTUpload = new CMTModel({
      name: CMTName,
      community: communityId,
      desc,
      img,
      squareFit: Number(squareFit),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      garage: Number(garage),
    });

    const CMTUploadStatus = await CMTUpload.save();

    if (CMTUploadStatus) {
      res.status(200).json({
        msg: "The Communtiy model has uploaded successfully",
      });
    } else {
      res.status(500).json({
        errors: {
          upload: {
            msg: "The Model hasn't uploaded, plese try again",
          },
        },
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = addModelsTab;
