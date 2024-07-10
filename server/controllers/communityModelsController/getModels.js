// import the model of communityModel 
const CMTModel = require('../../models/CMTModel');

const getModels = async (req, res) => {
  const {id} = req.params;
  try{
    const communityModels = await CMTModel.find({community: id});
    if(communityModels) {
      res.status(200).json({
        msg: "You got all models successfully",
        data: communityModels
      })
    } else {
      res.status(404).json({
        errors: {
          notFound: {
            msg: "There are no models of this community"
          }
        }
      })
    }
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = getModels;