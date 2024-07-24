const path = require("path");
const {unlink} = require("fs");

const blogImageDelete = async (req, res, next) => {
    const {imgUrl} = req.body;
    try {
        unlink(path.join(__dirname, `../../public/assets/blogs/${imgUrl}`), (err)=> {
          if(err) {
              console.log(err)
          } else {
            res.json({
              msg: "The blog image has deleted successfully"
            })
          }
        })
    } catch(err) {
        console.log(err);
    }
}

module.exports = blogImageDelete;