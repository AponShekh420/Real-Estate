const uploader = require("../../utils/multiUploader");

const uploadBlogImage = (req, res) => {
   const upload = uploader('blogs', ['image/jpeg', 'image/jpg', 'image/png'], 1000000000, 'Only jpg, jpeg and png allowed');

   upload.single("file")(req, res, (err)=> {
        if(err) {
            res.status(405).json({
                errors: {
                    img: {
                        msg: err.message,
                    }
                }
            })
        } else {
            res.status(200).json({
                message: req.file.filename,
            })
        }
   });
}


module.exports = uploadBlogImage;