const StateModel = require("../../models/StateModel");

// upload the state on database
const getStateBySlug = async (req, res)=> {
  const {active, slug} = req.body;
  const validation = {
    active,
    slug,
  };

  try {
    const state = await StateModel.findOne(validation);
    if(state) {
      res.status(200).json({
        message: "Got the state data",
        data: state
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


module.exports = getStateBySlug;