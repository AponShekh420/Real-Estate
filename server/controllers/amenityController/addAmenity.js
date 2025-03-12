const AmenityModel = require("../../models/AmenityModel");

const addAmenity = async (req, res) => {
  const { name, icon, popular } = req.body;

  try {
    const Amenity = new AmenityModel({
      name,
      icon,
      popular,
    });
    const status = await Amenity.save();
    if (status) {
      res.status(200).json({
        msg: "The amenity has added successfully",
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

module.exports = addAmenity;
