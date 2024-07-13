const CommunityModel = require("../../models/CommunityModel")

const getCommunities = async (req, res) => {

  const {searchParams, active, limitEnd, limitStart} = req.body;

  try {
    const getCommunitiesData = await CommunityModel.find({active}).populate('state').populate("city").populate('area');

     // Filter the results based on the populated fields
     const filteredCommunities = getCommunitiesData.filter(community => {
      return (
        community.title.match(new RegExp(searchParams, 'i')) ||
        community.state?.name.match(new RegExp(searchParams, 'i')) ||
        community.city?.name.match(new RegExp(searchParams, 'i')) ||
        community.area?.name.match(new RegExp(searchParams, 'i'))
      );
    });

    res.status(200).json({
      data: filteredCommunities.slice(limitStart, limitEnd),
      lotalNumberOfData: filteredCommunities.length,
    })


  } catch (err) {
    console.log(err.message)
  }
}

module.exports = getCommunities;