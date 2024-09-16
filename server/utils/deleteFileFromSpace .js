const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const dontenv = require("dotenv");

dontenv.config();


// Configure AWS SDK for DigitalOcean Spaces
const s3 = new S3Client({
    endpoint: 'https://nyc3.digitaloceanspaces.com', // Use your region's endpoint
    region: 'nyc3', // Your Space's region
    credentials: {
        accessKeyId: process.env.DO_SPACES_KEY,
        secretAccessKey: process.env.DO_SPACES_SECRET,
    },
});

// Function to extract file key from URL
const extractFileKeyFromUrl = (url) => {
  const urlObj = new URL(url);
  return urlObj.pathname.substring(1); // Remove leading '/' from pathname
};

// Function to delete file from DigitalOcean Spaces
const deleteFileFromSpace = async (BucketName, fileUrl) => {

  const fileKey = extractFileKeyFromUrl(fileUrl); // Extract file key from full URL
  console.log('File Key:', fileKey); // Check the key

  const params = {
      Bucket: BucketName,
      Key: fileKey, // The file path in your bucket (e.g., 'assets/communityImgs/file.jpg')
  };

  try {
      const data = await s3.send(new DeleteObjectCommand(params));
      console.log(`Successfully deleted ${fileKey} from assets-upload`);
      return data; // Log data response to ensure success
  } catch (err) {
      console.error(`Error deleting file ${fileKey}:`, err);
      throw err; // Handle any errors here
  }
};

module.exports = deleteFileFromSpace;

// Usage
// deleteFileFromSpace('assets-upload', 'path/to/your/file.jpg');
