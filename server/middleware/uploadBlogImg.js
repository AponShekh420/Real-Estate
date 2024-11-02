const uploader = require("../utils/multiUploader");

const uploadBlogImg = (req, res, next) => {
    const {uploadedImageChanged, uploadedImage} = req.body;
    const upload = uploader('blogs', ['image/jpeg', 'image/jpg', 'image/png'], 1000000000, 'Only jpg, jpeg and png allowed');
    if(uploadedImageChanged == false && uploadedImage == null) {
        next();
    } else {
        upload.any()(req, res, (err)=> {
            if(err) {
                res.json({
                    errors: {
                        img: {
                            msg: err.message,
                        }
                    }
                })
            } else {
                next();
            }
        });
    }
}


module.exports = uploadBlogImg;