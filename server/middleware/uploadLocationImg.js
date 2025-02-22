const uploader = require('../utils/multiUploader')
const uploadLocationImg = (req, res, next) => {
    const {uploadedImageChanged} = req.body;
    const upload = uploader('location', ['image/jpeg', 'image/jpg', 'image/png'], 20971520, 'Only jpg, jpeg and png allowed');
    if(uploadedImageChanged == false) {
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


module.exports = uploadLocationImg;