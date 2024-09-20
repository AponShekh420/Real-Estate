const deleteFileFromSpace = require("../utils/deleteFileFromSpace");


const useBlogImgDeletor = async (req, res, next) => {
    const {deleteImgUrls} = req.body;
    try {
      for(let img of deleteImgUrls) {
        await deleteFileFromSpace('assets-upload', img)
      }
      next();
    } catch(err) {
        console.log(err);
    }
}

module.exports = useBlogImgDeletor;