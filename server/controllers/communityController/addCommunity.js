const CommunityModel = require("../../models/CommunityModel");

const addCommunity = async (req, res) => {

  const {title, website, phone, address, stateId, cityId, areaId, zip, minPrice, maxPrice, homeTypes, communitySize, ageRestrictions, gated, builtStart, builtEnd, overview, imgs, bedrooms, bathrooms, garages, active, status, sqft} = req.body

  try {
    const Community = new CommunityModel({
      title,
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

    const uploadStatus = await Community.save();
    if(uploadStatus) {
      res.status(200).json({
        msg: "The community has added Successfully"
      });
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

module.exports = addCommunity;