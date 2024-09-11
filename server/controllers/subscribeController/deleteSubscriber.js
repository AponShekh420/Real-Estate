const SubscribeModel = require("../../models/SubscribeModel")

const deleteSubscriber = async (req, res) => {
  const {id} = req.params

  try {
    await SubscribeModel.findByIdAndDelete(id);
    res.status(200).json({
      msg: "Subscriber successfully deleted."
    })
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = deleteSubscriber;