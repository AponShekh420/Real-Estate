const path = require("path");
const {unlink} = require("fs");

const communityImageDelete = async (req, res) => {
    const {imgUrl} = req.body;
    try {
      unlink(path.join(__dirname, `../../public/assets/communityImgs/${imgUrl}`), (err)=> {
        if(err) {
            console.log(err)
        } else {
          res.json({
            message: 'Thumbnails has deleted successfully'
          })
        }
      })
    } catch(err) {
        console.log(err);
    }
}

module.exports = communityImageDelete;