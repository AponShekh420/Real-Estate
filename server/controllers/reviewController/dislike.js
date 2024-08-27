const ReviewModel = require("../../models/ReviewModel");

const dislike = async (req, res) => {
  const {id, status} = req.body;
  try {


     if(status) {
        // remove this like in revew dislike array
        const removeLike = await ReviewModel.findOneAndUpdate({
          like: {
            $in: [req?.user?.id]
          },
          _id: id
        }, {
          $pull: {
            like: req?.user?.id
          }
        }, {new: true});


        // add this like in revew like array
        const data = await ReviewModel.findOneAndUpdate({
          dislike: {
            $nin: [req?.user?.id]
          },
          _id: id
        }, {
          $push: {
            dislike: req?.user?.id
          }
        }, {new: true});

        // response for dislike success
        if(data) {
          res.status(200).json({
            msg: "Your dislike has been recorded.",
            data: data,
          })
        } else {
          res.status(409).json({
            errors: {
              notAllowed: {
                msg: "You have already dislike this review."
              }
            }
          })
        }

     } else {
        const data = await ReviewModel.findOneAndUpdate({
          dislike: {
            $in: [req?.user?.id]
          },
          _id: id
        }, {
          $pull: {
            dislike: req?.user?.id
          }
        }, {new: true});

        // response for dis like remove
        if(data) {
          res.status(200).json({
            msg: "Your dislike has been removed.",
            data: data,
          })
        } else {
          res.status(409).json({
            errors: {
              notAllowed: {
                msg: "Dislike has already been removed."
              }
            }
          })
        }
     }
    
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = dislike;
