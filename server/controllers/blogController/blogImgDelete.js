const deleteFileFromSpace = require("../../utils/deleteFileFromSpace ");

const blogImageDelete = async (req, res, next) => {
    const {imgUrl} = req.body;
    try {
      await deleteFileFromSpace('assets-upload', imgUrl);
      res.json({
        msg: "The blog image has deleted successfully"
      })
    } catch(err) {
        console.log(err);
    }
}

module.exports = blogImageDelete;