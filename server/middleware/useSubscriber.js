const SubscribeModel = require("../models/SubscribeModel")

const useSubscriber = async (req, res, next) => {
  const {email, communityId} = req.body

  try {
    const existingSubscriber = await SubscribeModel.findOne({email});
    if(existingSubscriber) {
      const {communities} = existingSubscriber
      if(!existingSubscriber?.communities?.includes(communityId)) {
        existingSubscriber.communities = [...communities, communityId];
        await existingSubscriber.save();
      }
      next();
    } else {
      const Subscriber = new SubscribeModel({email, communities: communityId});
      await Subscriber.save();
      next();
    }
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = useSubscriber;