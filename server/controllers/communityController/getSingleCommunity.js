const CommunityModel = require("../../models/CommunityModel");

const getSingleCommunity = async (req, res) => {
  const {slug} = req.params
  try {
    const singleCommunity = await CommunityModel.findOne({slug}).populate({path: "state"}).populate({path: "city"}).populate({path: "area"}).populate({path: "amenities"})
    if(singleCommunity) {
      res.status(200).json({
        message: "Community has fetched successfully",
        data: singleCommunity
      })
    } else {
      res.status(404).json({
        errors: {
          notFound: {
            msg: "The community has not founded"
          }
        }
      })
    }
  } catch(err){
    console.log(err.message)
  }
}

module.exports = getSingleCommunity;