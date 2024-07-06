const path = require("path");
const {unlink} = require("fs");

const communityImageDelete = async (req, res, next) => {
    const {imgUrl} = req.body;
    try {
        unlink(path.join(__dirname, `../../public/assets/communityImgs/${imgUrl}`), (err)=> {
          if(err) {
              console.log(err)
          } else {
            res.json({
              msg: "The communit image has deleted successfully"
            })
          }
        })
    } catch(err) {
        console.log(err);
    }
}

module.exports = communityImageDelete;