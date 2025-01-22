const AmenityModel = require("../../models/AmenityModel");
const BuilderModel = require("../../models/BuildersModel");

const getBuilders = async (req, res) => {
  try {
    const data = await BuilderModel.find();
    if (data) {
      res.status(200).json({
        data: data,
        msg: "Got all Builders",
      });
    } else {
      res.status(500).json({
        errors: {
          server: {
            msg: "There was an server side error",
          },
        },
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = getBuilders;
