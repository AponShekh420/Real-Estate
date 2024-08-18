const AmenityModel = require("../../models/AmenityModel");
const CommunityModel = require("../../models/CommunityModel");


const deleteAmenity = async (req, res) => {
  const {id} = req.body;
  try {
    const status = await AmenityModel.findByIdAndDelete(id)
    if(status) {
      // update the community collection to delete this amenity id
      await CommunityModel.updateMany({
        amenities: {
          $in: id
        }
      },
      {
        $pull: {
          amenities: id
        }
      });

      res.status(200).json({
        msg: "The amenity has deleted successfully"
      })
    } else {
      res.status(500).json({
        errors: {
          server: {
            msg: "There was an server side error"
          }
        }
      })
    }
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = deleteAmenity;