const SubscribeModel = require("../../models/SubscribeModel")

const addSubscriber = async (req, res) => {
  const {email} = req.body

  try {
    const existingSubscriber = await SubscribeModel.findOne({email});
    if(existingSubscriber) {
      res.status(403).json({
        errors: {
          exist: {
            msg: "You have already subscribed to our newsletter"
          }
        }
      })
    } else {
      const Subscriber = new SubscribeModel({email});
      await Subscriber.save();
      
      res.status(200).json({
        msg: "Thank you for subscribing"
      })
    }
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = addSubscriber;