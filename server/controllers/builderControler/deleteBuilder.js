const BuilderModel = require("../../models/BuildersModel");
const CommunityModel = require("../../models/CommunityModel");

const deleteBuilder = async (req, res) => {
  const { id } = req.body;
  try {
    const status = await BuilderModel.findByIdAndDelete(id);
    if (status) {
      // update the community collection to delete this amenity id
      await CommunityModel.updateMany(
        {
          builders: {
            $in: id,
          },
        },
        {
          $pull: {
            builders: id,
          },
        }
      );

      res.status(200).json({
        msg: "The builder has deleted successfully",
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

module.exports = deleteBuilder;
