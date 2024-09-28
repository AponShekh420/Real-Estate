const deleteFileFromSpace = require("../utils/deleteFileFromSpace");
const uploader = require("../utils/multiUploader");

const uploadCommunityImages = (req, res, next) => {
  const upload = uploader('communityImgs', ['image/jpeg', 'image/jpg', 'image/png'], 10000000, 'Only jpg, jpeg, and png allowed');
  
  upload.any()(req, res, async (err) => {
       if (err) {
           return res.status(405).json({
               errors: {
                   imgs: {
                       msg: err.message,
                   }
               }
           });
       }

       // New images are uploaded, and we store their URLs
       const newImageUrls = req.files.map((file) => file.location);

       // Existing image URLs passed from the frontend
       const existingImages = JSON.parse(req.body.existingImages);

       // Deleted images passed from the frontend
       const deletedImages = JSON.parse(req.body.deletedImages);

       // Now you can handle image deletions and update the database with the combined result
       const updatedImages = [...existingImages, ...newImageUrls];

       // For example, you could delete files from DigitalOcean based on deletedImages array
        for(let file of deletedImages) {
            await deleteFileFromSpace('assets-upload', file)
        }

       req.body.imgs = updatedImages;
       next();
   });
};

module.exports = uploadCommunityImages;
