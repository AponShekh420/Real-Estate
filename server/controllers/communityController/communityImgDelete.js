const deleteFileFromSpace = require("../../utils/deleteFileFromSpace");

const communityImageDelete = async (req, res, next) => {
    const {imgUrl} = req.body;
    try {
        await deleteFileFromSpace('assets-upload', imgUrl);
        res.json({
          msg: "The communit image has deleted successfully"
        })
    } catch(err) {
        console.log(err);
    }
}

module.exports = communityImageDelete;