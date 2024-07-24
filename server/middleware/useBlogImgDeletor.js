const path = require("path");
const {unlink} = require("fs");


const useBlogImgDeletor = async (req, res, next) => {
    const {deleteImgUrl} = req.body;
    try {
      unlink(path.join(__dirname, `../public/assets/blogs/${deleteImgUrl}`), (err)=> {
        if(err) {
            console.log(err)
        } else {
          next();
        }
      })
    } catch(err) {
        console.log(err);
    }
}

module.exports = useBlogImgDeletor;