// import the model of community for query the all community by filter
const BlogModel = require("../../models/BlogModel")




// This controller will give us communities data by filter
const getBlogsByFilter = async (req, res) => {

  const {catagoryId, titleSearch, active, limitStart, limitEnd, notCatagoryId} = req.body

  const dataQueryObj = {}
  catagoryId ? dataQueryObj.catagory = catagoryId : null
  notCatagoryId ? dataQueryObj.catagory = {$ne: notCatagoryId} : null
  titleSearch ? dataQueryObj.title = {$regex: titleSearch || "", $options: "i"} : null

  

  try {
    const data = await BlogModel.find({
      ...dataQueryObj,
      active,
    }).sort({ createdAt: -1 }).skip(limitStart).limit(limitEnd);

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

module.exports = getBlogsByFilter;