const AreaModel = require("../../models/AreaModel");
const CommunityModel = require("../../models/CommunityModel");
const CityModel = require("../../models/CityModel");
const StateModel = require("../../models/StateModel");

const activeState = async (req, res) => {
  const { stateId } = req.body;
  try {
    const activeCityStatus = await StateModel.findByIdAndUpdate(stateId, {
      active: true,
    });

    if (activeCityStatus) {
      const activeAllAreaStatus = await AreaModel.updateMany(
        { state: stateId },
        {
          active: true,
        }
      );

      const activeAllCityStatus = await CityModel.updateMany(
        { state: stateId },
        {
          active: true,
        }
      );

      const communities = await CommunityModel.updateMany(
        {
          state: stateId,
          $and: [
            {
              city: {
                $ne: null,
              },
            },
            {
              area: {
                $ne: null,
              },
            },
          ],
        },
        {
          active: true,
        }
      );

      if (communities && activeAllAreaStatus && activeAllCityStatus) {
        res.status(200).json({
          msg: "The state has activated",
        });
      } else {
        res.status(500).json({
          errors: {
            locationUpdate: {
              msg: "There was an server side error",
            },
          },
        });
      }
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

module.exports = activeState;
