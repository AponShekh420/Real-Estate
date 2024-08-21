const SubcatagoryModel = require("../../models/SubcatagoryModel");

// upload the state on database
const getSubcatagoryBySlug = async (req, res)=> {
  const {active, slug} = req.body;
  const validation = {
    slug,
  };

  try {
    const subcatagory = await SubcatagoryModel.findOne(validation);
    if(subcatagory) {
      res.status(200).json({
        message: "Got the subcatagory data",
        data: subcatagory
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


module.exports = getSubcatagoryBySlug;