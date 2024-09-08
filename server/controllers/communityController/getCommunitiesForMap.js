const CommunityModel = require("../../models/CommunityModel")

const getCommunitiesForMap = async (req, res) => {

  try {
    const getCommunitiesData = await CommunityModel.find({active: true}).populate('state').populate('city').populate('area');

    res.status(200).json({
      msg: "Got All Communities",
      data: getCommunitiesData,
    })


  } catch (err) {
    console.log(err.message)
  }
}

module.exports = getCommunitiesForMap;