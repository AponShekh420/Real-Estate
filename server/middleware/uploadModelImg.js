const uploader = require('../utils/multiUploader')
const uploadModelImg = (req, res, next) => {
   const upload = uploader('communityModels', ['image/jpeg', 'image/jpg', 'image/png'], 1000000000, 'Only jpg, jpeg and png allowed');

   upload.any()(req, res, (err)=> {
        if(err) {
            res.json({
                errors: {
                    communityModelImg: {
                        msg: err.message,
                    }
                }
            })
        } else {
            next();
        }
   });
}


module.exports = uploadModelImg;