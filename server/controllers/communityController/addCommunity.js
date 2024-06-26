const CommunityModel = require("../../models/CommunityModel");
const StateModel = require("../../models/StateModel");
const CityModel = require("../../models/CityModel");
const AreaModel = require("../../models/AreaModel");

const addCommunity = async (req, res) => {

  // send these data from front-end to add a community in database
  const {title, website, phone, address, stateId, cityId, areaId, zip, minPrice, maxPrice, homeTypes, communitySize, ageRestrictions, gated, builtStart, builtEnd, overview, imgs, bedrooms, bathrooms, garages, active, status, sqft} = req.body

  try {

    // slug making
    const duplicateArea = await CommunityModel.find({title});

    let slug;
    if(duplicateArea.length > 0){
      slug = title.toLowerCase().trim().split(' ').join("-") + "-" + duplicateArea.length;
    } else {
      slug = title.toLowerCase().trim().split(' ').join("-");
    }


    // upload the community in database
    const community = await CommunityModel.insertMany({
      title,
      slug,
      website, 
      phone,
      address,
      state: stateId,
      city: cityId,
      area: areaId,
      zip,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      garages,
      active,
      status,
      sqft,
      homeTypes,
      imgs,
      overview,
      builtEnd,
      builtStart,
      gated,
      ageRestrictions,
      communitySize
    })

    // check: the community has upload in database or not
    if(community) {
      // push the community in state community list
      const stateUpdate = await StateModel.findByIdAndUpdate(stateId, {
        $push: {
          community: community[0]._id
        }
      })

      // push the community in city community list
      const cityUpdate = await CityModel.findByIdAndUpdate(cityId, {
        $push: {
          community: community[0]._id
        }
      })

      // push the community in area community list
      const areaUpdate = await AreaModel.findByIdAndUpdate(areaId, {
        $push: {
          community: community[0]._id
        }
      })

      // check: those cityModel, StateModel and areaModel has updated or not
      if(stateUpdate && cityUpdate && areaUpdate) {
        res.status(200).json({
          msg: "The community has added Successfully"
        })
      } else {
        // the community has uploaded, but the community field has not updated from cityModel, stateModel or areaModel, that's why we should delete the community and to send the server side error 
        await CommunityModel.findByIdAndDelete(community[0]._id);
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

module.exports = addCommunity;