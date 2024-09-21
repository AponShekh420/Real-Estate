// import the model of community for query the all community by filter
const CommunityModel = require("../../models/CommunityModel")
const StateModel = require("../../models/StateModel")
const CityModel = require("../../models/CityModel")
const AreaModel = require("../../models/AreaModel")
const BlogModel = require("../../models/BlogModel")




// This controller will give us communities data by filter
const getSuggestions = async (req, res) => {

  const {search} = req.body;

  try {
    const communities = await CommunityModel.find({
      title: {$regex: search, $options: "i"},
      active: true,
    }).select("title slug state city area").limit(2).populate("state", "name abbreviation").populate("city", "name").populate("area", "name abbreviation");

    const states = await StateModel.find({
      name: {$regex: search, $options: "i"},
      active: true,
    }).select("name slug").limit(2);

    // const cities = await CityModel.find({
    //   name: {$regex: search, $options: "i"},
    //   active: true,
    // }).select("name slug").limit(2);

    const areas = await AreaModel.find({
      name: {$regex: search, $options: "i"},
      active: true,
    }).select("name slug state city").limit(2).populate("state", "slug abbreviation").populate("city", "slug");

    const blogs = await BlogModel.find({
      title: {$regex: search, $options: "i"},
      active: true,
    }).select("title slug catagory").limit(2).populate("catagory", "name");


    const data = {
      communities,
      blogs,
      states,
      // cities,
      areas
    }


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

module.exports = getSuggestions;