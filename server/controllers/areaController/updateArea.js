const AreaModel = require("../../models/AreaModel");
const CityModel = require("../../models/CityModel");
const CommunityModel = require("../../models/CommunityModel");
const StateModel = require("../../models/StateModel");

const updateArea = async (req, res) => {
  
  try {
    const {name, desc, stateId, areaId, cityId } = req.body;

    // slug making
    const duplicateArea = await AreaModel.find({name, _id: {$ne: areaId}});
    const currentArea = await AreaModel.findById(areaId);

    let slug;
    if(name === currentArea.name) {
      slug = currentArea.slug
    } else {
      if(duplicateArea.length > 0){
        slug = name.toLowerCase().trim().split(' ').join("-") + "-" + duplicateArea.length;
      } else {
        slug = name.toLowerCase().trim().split(' ').join("-");
      }
    }


    const Area = await AreaModel.findByIdAndUpdate(areaId, {
      name,
      slug,
      active: true,
      desc,
      state: stateId,
      city: cityId
    });

    // updating the state collection to add area in area field on state
    if(Area) {

      const communitisList = await CommunityModel.find({area: areaId}).select('_id');

       // change the state from communtiy
       const communityUpdateStatus = await CommunityModel.updateMany({area: areaId}, {
        city: cityId,
        state: stateId
      });

      console.log(Area)

      // remove the old city and the communtiy from old city
      const OldCity = await CityModel.updateMany({
        area: {
          $in: areaId
        }
      }, {
        $pull: {
          area: areaId
        },
        $pullAll: {
          community: communitisList
        }
      })


      // remove the old city of state
      const oldState = await StateModel.updateMany({
        _id: Area.state
      }, 
      {
        $pullAll: {
          community: communitisList
        }
      })

      
      // adding the area in city
      if(OldCity && oldState && communitisList && communityUpdateStatus) {
        const city = await CityModel.findByIdAndUpdate(cityId, {
          $push: {
            area: Area._id,
            community: {
              $each: communitisList
            }
          }
        })

        // push community in new state community field or aray
        const state = await StateModel.findByIdAndUpdate(stateId, {
          $push: {
            community: {
              $each: communitisList
            }
          }
        })

        // check validation: is state has updated or not
        if(city && state) {
          res.status(200).json({
            msg: "The Area Has updated Successfully"
          })
        } else {
          res.status(500).json({
            errors: {
              msg: "There was an server side error"
            }
          })
        }

      } else{
        res.status(500).json({
          errors: {
            msg: "There was an server side error"
          }
        })
      }
    } else {
      res.status(500).json({
        errors: {
          msg: "There was an server side error"
        }
      })
    }
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = updateArea;