const uploader = require("../../utils/multiUploader");

const uploadCommunityImages = (req, res) => {
   const upload = uploader('communityImgs', ['image/jpeg', 'image/jpg', 'image/png'], 104857600, 'Only jpg, jpeg and png allowed');

   upload.any()(req, res, (err)=> {
        if(err) {
            res.status(405).json({
                errors: {
                    imgs: {
                        msg: err.message,
                    }
                }
            })
        } else {
           // Check and construct the correct URL for each file
            const uploadedImages = req.files.map((eachFile) => {
                // Ensure the file location is a complete URL
                if (!eachFile.location || !eachFile.location.startsWith('http')) {
                // If location is missing, construct the full URL
                return `https://${process.env.SPACES_ENDPOINT}/${eachFile.bucket}/${eachFile.key}`;
                }
                return eachFile.location;
            });

            // Respond with the array of uploaded image URLs
            return res.status(200).json({
                message: uploadedImages,
            });
        }
   });
}


module.exports = uploadCommunityImages;