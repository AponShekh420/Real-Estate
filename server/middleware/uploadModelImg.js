const deleteFileFromSpace = require("../utils/deleteFileFromSpace");
const uploader = require("../utils/multiUploader"); // Your existing uploader setup

const uploadModelImg = (req, res, next) => {
  const upload = uploader(
    'communityModels', // Folder or directory where images will be uploaded
    ['image/jpeg', 'image/jpg', 'image/png'], // Allowed mime types
    20971520, // Max file size (10MB in this case)
    'Only jpg, jpeg, and png allowed' // Error message for invalid file types
  );

  // Handle single image upload using multer's `.single()` method
  upload.single('img')(req, res, async (err) => {
    if (err) {
      return res.status(405).json({
        errors: {
          img: {
            msg: err.message,
          }
        }
      });
    }

    // New image uploaded
    const newImageUrl = req.file?.location; // Get uploaded image URL

    // Existing image passed from frontend (optional, check if defined)
    let existingImage;
    try {
      existingImage = req.body.existingImage ? JSON.parse(req.body.existingImage) : null;
    } catch (error) {
      return res.status(400).json({ error: 'Invalid existingImage format' });
    }

    // Deleted image passed from frontend (optional, check if defined)
    let deletedImage;
    try {
      deletedImage = req.body.deletedImage ? JSON.parse(req.body.deletedImage) : null;
    } catch (error) {
      return res.status(400).json({ error: 'Invalid deletedImage format' });
    }

    let updatedImage = existingImage;
    if (newImageUrl) {
      // If new image uploaded, update it and delete the old one
      updatedImage = newImageUrl;

      if (deletedImage) {
        // Delete only if deletedImage is not the same as updatedImage
        try {
          await deleteFileFromSpace('assets-upload', deletedImage);
        } catch (error) {
          console.error(`Failed to delete image ${deletedImage}:`, error);
        }
      }
    }

    // Update `req.body.img` to use the updated image URL for further processing
    req.body.img = updatedImage;

    next(); // Proceed to the next middleware or controller
  });
};

module.exports = uploadModelImg;
