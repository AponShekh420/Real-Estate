const SubscribeModel = require("../../models/SubscribeModel")

const getSubscribers = async (req, res) => {
  const {searchParams, limitEnd, limitStart} = req.body;

  try {
    const subscribers = await SubscribeModel.find();

    // Filter the results based on fetch data
    const filteredSubscribers = subscribers.filter(subscriber => {
      return (
        subscriber?.email?.match(new RegExp(searchParams, 'i'))
      );
    });

    res.status(200).json({
      msg: "Got all subscribers",
      data: filteredSubscribers.slice(limitStart, limitEnd),
      lotalNumberOfData: filteredSubscribers.length,
    })
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = getSubscribers;