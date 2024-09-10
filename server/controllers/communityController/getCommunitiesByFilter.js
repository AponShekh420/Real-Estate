// import the model of community for query the all community by filter
const CommunityModel = require("../../models/CommunityModel")




// This controller will give us communities data by filter
const getCommunitiesByFilter = async (req, res) => {

  const {stateId, cityId, areaId, status, homeTypes, titleSearch, active, limitStart, limitEnd, amenities, gated, price, ageRestrictions } = req.body


  // filter start
  const dataQueryObj = {}
  stateId ? dataQueryObj.state = stateId : null
  cityId ? dataQueryObj.city = cityId : null
  areaId ? dataQueryObj.area = areaId : null
  status ? dataQueryObj.status = {$in: [status]} : null
  titleSearch ? dataQueryObj.title = {$regex: titleSearch || "", $options: "i"} : null
  homeTypes?.length > 0 ? dataQueryObj.homeTypes = {$in: homeTypes} : null
  amenities?.length > 0 ? dataQueryObj.amenities = {$in: amenities.map(amenity => amenity._id)} : null

  price ? dataQueryObj.minPrice = {$gte: price[0], $lte: price[1] } : null
  price ? dataQueryObj.maxPrice = {$gte: price[0], $lte: price[1] } : null

  if(ageRestrictions == "No") {
    dataQueryObj.ageRestrictions = false
  } else if(ageRestrictions == "Yes") {
    dataQueryObj.ageRestrictions = true
  }

  if(gated == "No") {
    dataQueryObj.gated = false
  } else if(gated == "Yes") {
    dataQueryObj.gated = true
  }
  // filter end


  try {
    const data = await CommunityModel.find({
      ...dataQueryObj,
      active,
    }).skip(limitStart).limit(limitEnd);

    if(data) {
      res.status(200).json({
        msg: "The data has been received successfully",
        data: data
      })
    } else {
      res.status(404).json({
        errors: {
          notFound: {
            msg: "No data found"
          }
        }
      })
    }
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = getCommunitiesByFilter;