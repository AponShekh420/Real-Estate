const CatagoryModel = require("../../models/CatagoryModel");

// upload the catagory on database
const getCatagoryBySlug = async (req, res)=> {
  const {slug} = req.body;
  const validation = {
    slug,
  };

  try {
    const catagory = await CatagoryModel.findOne(validation);
    if(catagory) {
      res.status(200).json({
        message: "Got the catagory data",
        data: catagory
      });
    } else {
      res.status(500).json({
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


module.exports = getCatagoryBySlug;