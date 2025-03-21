// import the model of community for query the all community by filter
const CommunityModel = require("../../models/CommunityModel")
const StateModel = require("../../models/StateModel")
const CityModel = require("../../models/CityModel")
const AreaModel = require("../../models/AreaModel")
const BlogModel = require("../../models/BlogModel")




// This controller will give us communities data by filter
const getSearchResults = async (req, res) => {

  const {search, filterData} = req.body;

  try {
    const communities = await CommunityModel.find({
      title: {$regex: search, $options: "i"},
      active: true,
    }).select("title slug state city area").populate("state", "name abbreviation").populate("city", "name").populate("area", "name abbreviation");

    const states = await StateModel.find({
      name: {$regex: search, $options: "i"},
      active: true,
    }).select("name slug");

    // const cities = await CityModel.find({
    //   name: {$regex: search, $options: "i"},
    //   active: true,
    // }).select("name slug").limit(2);

    const areas = await AreaModel.find({
      name: {$regex: search, $options: "i"},
      active: true,
    }).select("name slug state city").populate("state", "slug abbreviation").populate("city", "slug");

    const cities = await CityModel.find({
      name: {$regex: search, $options: "i"},
      active: true,
    }).select("name slug state area").populate("state", "slug abbreviation").populate("area", "slug abbreviation");

    const blogs = await BlogModel.find({
      title: {$regex: search, $options: "i"},
      active: true,
    }).select("title slug catagory").populate("catagory", "name");



   const blogsWithType = blogs.map((item, index)=> {
    const editAbleData = item.toObject(); // Convert to plain object
    editAbleData.type = 'blog';
    return editAbleData
   });

   const areasWithType = areas.map((item, index)=> {
    const editAbleData = item.toObject(); // Convert to plain object
    editAbleData.type = 'area';
    return editAbleData
   });

   const citiesWithType = cities.map((item, index)=> {
    const editAbleData = item.toObject(); // Convert to plain object
    editAbleData.type = 'city';
    return editAbleData
   });

   const communitiesWithType = communities.map((item, index)=> {
    const editAbleData = item.toObject(); // Convert to plain object
    editAbleData.type = 'community';
    return editAbleData
   });

   const statesWithType = states.map((item, index)=> {
    const editAbleData = item.toObject(); // Convert to plain object
    editAbleData.type = 'state';
    return editAbleData
   });


    let data = [];


    if(filterData.includes('Communities')) {
      data = [...data, ...communitiesWithType]
    }
    if(filterData.includes('Blog')) {
      data = [...data, ...blogsWithType]
    }
    if(filterData.includes('City')) {
      data = [...data, ...citiesWithType]
    }
    if(filterData.includes('Area')) {
      data = [...data, ...areasWithType]
    }
    if(filterData.includes('State')) {
      data = [...data, ...statesWithType]
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

module.exports = getSearchResults;