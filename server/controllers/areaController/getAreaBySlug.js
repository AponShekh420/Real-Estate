const AreaModel = require("../../models/AreaModel");

// upload the state on database
const getAreaBySlug = async (req, res) => {
  const { active, slug } = req.body;
  const validation = {
    active,
    slug,
  };

  try {
    const area = await AreaModel.findOne(validation)
      .populate("state")
      .populate({
        path: "city",
        populate: {
          path: "community",
          select: "active",
        },
      })
      .populate({ path: "community", select: "active" });
    if (area) {
      res.status(200).json({
        message: "Got the area data",
        data: area,
      });
    } else {
      res.status(500).json({
        errors: {
          notFound: {
            msg: "No data found",
          },
        },
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = getAreaBySlug;
