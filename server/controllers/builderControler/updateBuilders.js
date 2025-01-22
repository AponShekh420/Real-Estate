const BuilderModel = require("../../models/BuildersModel");

const updateBuilders = async (req, res) => {
  const { name, icon, id } = req.body;

  try {
    const status = await BuilderModel.findByIdAndUpdate(id, {
      name,
      icon,
    });
    if (status) {
      res.status(200).json({
        msg: "The builder has updated successfully",
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

module.exports = updateBuilders;
