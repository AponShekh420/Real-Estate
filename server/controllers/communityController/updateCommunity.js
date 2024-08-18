const CommunityModel = require("../../models/CommunityModel");
const StateModel = require("../../models/StateModel");
const CityModel = require("../../models/CityModel");
const AreaModel = require("../../models/AreaModel");

const updateCommuity = async (req, res) => {

  try {
    // send these data from front-end to add a community in database
    const {lat, long, communityId, title, website, phone, address, stateId, cityId, areaId, zip, minPrice, maxPrice, homeTypes, communitySize, ageRestrictions, gated, builtStart, builtEnd, overview, imgs, bedrooms, bathrooms, garages, active, status, sqft, description, amenities} = req.body

    // Find the current community by ID
    const currentCommunity = await CommunityModel.findById(communityId);
    if (!currentCommunity) {
      return res.status(404).json({ error: "Community not found" });
    }

    let slug;
    // If the title hasn't changed, keep the current slug
    if (title === currentCommunity.title) {
      slug = currentCommunity.slug;
    } else {
      // Remove special characters and generate slug
      const sanitizedTitle = title.toLowerCase().trim().replace(/[^\w\s-]/g, '');
      slug = sanitizedTitle.split(' ').join('-');

      // Check for duplicates excluding the current communtiy ID
      const duplicateCommunityCount = await CommunityModel.countDocuments({ slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: 'i' }, _id: { $ne: communityId } });

      if (duplicateCommunityCount > 0) {
        slug = `${slug}-${duplicateCommunityCount}`;
      }
    }


    console.log(currentCommunity.state)

    // upload the community in database
    const community = await CommunityModel.findByIdAndUpdate(communityId, {
      title,
      slug,
      lat,
      long,
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
      builtEnd: builtEnd || "Present",
      builtStart,
      gated,
      ageRestrictions,
      communitySize,
      description,
      amenities
    }).populate("area").populate("state").populate("city");

    console.log(community);


    // check: the community has upload in database or not
    if(community) {

      if((community?.area?.active === false || community?.state?.active === false || community?.city?.active === false) && (community?.area?.active != null || community?.state?.active != null || community?.city?.active != null)) {
        // the community has updated, but the community field has not updated from cityModel, stateModel or areaModel, that's why we should delete the community and to send the server side error 
        await CommunityModel.findByIdAndUpdate(community._id, community);
        res.status(500).json({
          errors: {
            locationUpdate: {
              msg: "You can't active the community with deactive location"
            }
          }
        });
      } else {
        // if the new state, area, city are not same with oldCommunity data then we should remove these from our community field of state, area, city
        if(currentCommunity.state != stateId) {
          // pull the community in state community list
          await StateModel.findByIdAndUpdate(currentCommunity.state, {
            $pull: {
              community: currentCommunity._id
            }
          });

          // push the community in new state community list
          const stateUpdate = await StateModel.findByIdAndUpdate(stateId, {
            $push: {
              community: community._id
            }
          })
        }

        // check the city
        if(currentCommunity.city != cityId) {
          // pull the community in city community list
          await CityModel.findByIdAndUpdate(currentCommunity.city, {
            $pull: {
              community: currentCommunity._id
            }
          });

          // push the community in new city community list
          const cityUpdate = await CityModel.findByIdAndUpdate(cityId, {
            $push: {
              community: community._id
            }
          })
        }


        // check the area
        if(currentCommunity.area != areaId) {
          // pull the community in area community list
          await AreaModel.findByIdAndUpdate(currentCommunity.area, {
            $pull: {
              community: currentCommunity._id
            }
          });

          // push the community in new area community list
          const areaUpdate = await AreaModel.findByIdAndUpdate(areaId, {
            $push: {
              community: community._id
            }
          })
        }

        // if everything is perfect then would get response
        res.status(200).json({
          msg: "The community has updated Successfully"
        })
      }
    } else {
      // the community has updated, but the community field has not updated from cityModel, stateModel or areaModel, that's why we should delete the community and to send the server side error 
      await CommunityModel.findByIdAndUpdate(community._id, community);
      res.status(500).json({
        errors: {
          server: {
            msg: "Communtiy hasn't updated for server side error"
          }
        }
      });
    }

  } catch(err) {
    console.log(err.message)
  }
}

module.exports = updateCommuity;