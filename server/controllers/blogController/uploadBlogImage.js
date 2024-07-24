const uploader = require("../../utils/multiUploader");

const uploadBlogImage = (req, res) => {
   const upload = uploader('blogs', ['image/jpeg', 'image/jpg', 'image/png'], 1000000000, 'Only jpg, jpeg and png allowed');

   upload.any()(req, res, (err)=> {
        if(err) {
            res.json({
                errors: {
                    blogImg: {
                        msg: err.message,
                    }
                }
            })
        } else {
            res.status(200).json({
                message: req.files[0].filename,
            })
        }
   });
}


module.exports = uploadBlogImage;