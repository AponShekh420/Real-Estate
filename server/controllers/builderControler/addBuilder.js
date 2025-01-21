const BuilderModel = require("../../models/BuildersModel");

const addBuilder = async (req, res) => {
  const { name, icon } = req.body;

  try {
    const Builder = new BuilderModel({
      name,
      icon,
    });
    const status = await Builder.save();
    if (status) {
      res.status(200).json({
        msg: "The Builder has added successfully",
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

module.exports = addBuilder;
