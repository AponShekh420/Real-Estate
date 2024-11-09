const CommunityModel = require("../../models/CommunityModel");
const StateModel = require("../../models/StateModel");
const CityModel = require("../../models/CityModel");
const AreaModel = require("../../models/AreaModel");
const mongoose = require('mongoose');

const addCommunity = async (req, res) => {

  // send these data from front-end to add a community in database
  const {title, metaSlug, map, website, phone, address, stateId, cityId, areaId, zip, minPrice, maxPrice, homeTypes, communitySize, ageRestrictions, gated, builtStart, builtEnd, imgs, active, description, amenities, currentThumbnail, metaTitle, metaDesc} = req.body

  try {

    // Remove special characters and make the slug
    const sanitizedTitle = metaSlug ? metaSlug.toLowerCase().trim().replace(/[^\w\s-]/g, '') : title.toLowerCase().trim().replace(/[^\w\s-]/g, '');
    let slug = sanitizedTitle.split(' ').join('-');

    // Check for duplicates
    const duplicateCommunityCount = await CommunityModel.countDocuments({ slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: 'i' } });

    if (duplicateCommunityCount > 0) {
      slug = `${slug}-${duplicateCommunityCount}`;
    }

       // Check if cityId is valid ObjectId or set to null
       const cityIdValid = cityId && mongoose.Types.ObjectId.isValid(cityId) ? cityId : null;


    // upload the community in database
    const community = await CommunityModel.insertMany({
      metaTitle,
      metaDesc,
      map,
      title,
      slug,
      website, 
      phone,
      address,
      state: stateId,
      city: cityIdValid,
      area: areaId,
      zip,
      minPrice,
      maxPrice,
      active,
      homeTypes,
      imgs: imgs,
      builtEnd: builtEnd || "Present",
      builtStart,
      gated,
      ageRestrictions,
      communitySize,
      description,
      amenities: JSON.parse(amenities),
      thumbnail: currentThumbnail
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
      if(cityIdValid) {
        await CityModel.findByIdAndUpdate(cityId, {
          $push: {
            community: community[0]._id
          }
        })
      }

      // push the community in area community list
      const areaUpdate = await AreaModel.findByIdAndUpdate(areaId, {
        $push: {
          community: community[0]._id
        }
      })

      // check: those cityModel, StateModel and areaModel has updated or not
      if(stateUpdate && areaUpdate) {
        res.status(200).json({
          msg: "The community has added Successfully",
          data: community[0]
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