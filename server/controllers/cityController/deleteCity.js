// import models
const CityModel = require('../../models/CityModel');
const AreaModel = require('../../models/AreaModel');
const CommunityModel = require('../../models/CommunityModel')
const deleteFileFromSpace = require('../../utils/deleteFileFromSpace');

const deleteCity = async (req, res) => {
  const {cityId} = req.body

  try {
    const cityDeleteStatus = await CityModel.findByIdAndDelete(cityId);

    // check: if the area has deleted successfully then we should remove this cityId from city and communtiy and make the area and community deactive
    if(cityDeleteStatus) {

      // update the city collection to delete this state id
      const areaUpdateStatus = await AreaModel.updateMany({
        city: {
          $in: cityId
        }
      },
      {
        $pull: {
          city: cityId
        }
      }
    );

      // update the community collection to delete this state id
      const communtiyUpdateStatus = await CommunityModel.updateMany({city: cityId}, {
        city: null,
        active: false
      });

      // try to check those cities, areas, and communities has update or not
      if(areaUpdateStatus && communtiyUpdateStatus) {
        if(cityDeleteStatus?.img) {
          await deleteFileFromSpace('assets-upload', cityDeleteStatus.img);
          res.status(200).json({
            msg: "The city has deleted successfully"
          })
        } else {
          res.status(200).json({
            msg: "The city has deleted successfully"
          })
        }
      } else {
        res.status(500).json({
          errors: {
            locationUpdate: {
              msg: "There was an server side error"
            }
          }
        })
      }

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

module.exports = deleteCity;