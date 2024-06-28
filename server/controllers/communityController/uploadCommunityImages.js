const uploader = require("../../utils/multiUploader");

const uploadCommunityImages = (req, res) => {
   const upload = uploader('communityImgs', ['image/jpeg', 'image/jpg', 'image/png'], 1000000000, 'Only jpg, jpeg and png allowed');

   upload.any()(req, res, (err)=> {
        if(err) {
            res.json({
                errors: {
                    communityImgs: {
                        msg: err.message,
                    }
                }
            })
        } else {
            res.status(200).json({
                message: req.files.map((eachFile)=> eachFile.filename),
            })
        }
   });
}


module.exports = uploadCommunityImages;