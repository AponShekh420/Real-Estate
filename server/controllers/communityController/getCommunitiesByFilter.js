// import the model of community for query the all community by filter
const CommunityModel = require("../../models/CommunityModel")




// This controller will give us communities data by filter
const getCommunitiesByFilter = async (req, res) => {

  const {stateId, cityId, areaId, status, homeTypes, titleSearch, active, limitStart, limitEnd, amenities} = req.body

  const dataQueryObj = {}
  stateId ? dataQueryObj.state = stateId : null
  cityId ? dataQueryObj.city = cityId : null
  areaId ? dataQueryObj.area = areaId : null
  status ? dataQueryObj.status = {$in: [status]} : null
  titleSearch ? dataQueryObj.title = {$regex: titleSearch || "", $options: "i"} : null
  homeTypes?.length > 0 ? dataQueryObj.homeTypes = {$in: homeTypes} : null
  amenities?.length > 0 ? dataQueryObj.amenities = {$in: amenities.map(amenity => amenity._id)} : null

  

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