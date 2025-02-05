const StateModel = require("../../models/StateModel");

// upload the state on database
const getStatesOnlyWithCommunities = async (req, res) => {
  const { limit } = req.body;
  try {
    const state = await StateModel.find({
      active: true,
      community: { $exists: true, $ne: [] },
    })
      .sort({ name: 1 })
      .limit(limit)
      .populate({ path: "community", select: "active" })
      .select("name slug _id community desc img");

    if (state) {
      res.status(200).json({
        message: "Got the all state",
        data: state,
      });
    } else {
      res.status(500).json({
        errors: {
          server: {
            msg: "There was an server side error",
          },
        },
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = getStatesOnlyWithCommunities;
