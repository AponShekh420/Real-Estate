const ReviewModel = require("../../models/ReviewModel");

const like = async (req, res) => {
  const {id, status} = req.body;
  try {
     if(status) {
      // remove this like in revew dislike array
      const removeDislike = await ReviewModel.findOneAndUpdate({
        dislike: {
          $in: [req?.user?.id]
        },
        _id: id
      }, {
        $pull: {
          dislike: req?.user?.id
        }
      }, {new: true});


      // add this like in revew like array
      const data = await ReviewModel.findOneAndUpdate({
        like: {
          $nin: [req?.user?.id]
        },
        _id: id
      }, {
        $push: {
          like: req?.user?.id
        }
      }, {new: true});

      if(data) {
        res.status(200).json({
          msg: "Thank you for like!",
          data: data,
        })
      } else {
        res.status(409).json({
          errors: {
            notAllowed: {
              msg: "You have already liked this review."
            }
          }
        })
      }

     } else {
       // remove this like in revew like array
        const data = await ReviewModel.findOneAndUpdate({
          like: {
            $in: [req?.user?.id]
          },
          _id: id
        }, {
          $pull: {
            like: req?.user?.id
          }
        }, {new: true});

        if(data) {
          res.status(200).json({
            msg: "Your like has been removed.",
            data: data,
          })
        } else {
          res.status(409).json({
            errors: {
              notAllowed: {
                msg: "Like has already been removed."
              }
            }
          })
        }
     }

  } catch(err) {
    console.log(err.message)
  }
}

module.exports = like;
