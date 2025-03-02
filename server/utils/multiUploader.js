// const path = require('path')
// const multer = require('multer')
// const createHttpError = require('http-errors')

// const uploader = (subFolder, fileType, fileSize, err_msg) => {

//     const UPLOAD_FILE = path.join(__dirname, `/../public/assets/${subFolder}`);

//     const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, UPLOAD_FILE);
//         },
//         filename: (req, file, cb) => {
//             const fileExt = path.extname(file.originalname);
//             const fileName = file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-') + "-" + Date.now();
//             cb(null, fileName + fileExt);
//         }
//     })

//     const uplaod = multer({
//         storage: storage,
//         limits: {
//             fileSize: fileSize,
//         },
//         fileFilter: (req, file, cb) => {
//             if(fileType.includes(file.mimetype)) {
//                 cb(null, true)
//             } else {
//                 cb(createHttpError(err_msg))
//             }
//         }
//     })

//     return uplaod;
// }

// module.exports = uploader;

// for production

const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multerS3 = require("multer-s3");
const path = require("path");

const dotenv = require("dotenv");

dotenv.config();

// Configure AWS SDK for DigitalOcean Spaces using AWS SDK v3
const s3 = new S3Client({
  endpoint: "https://nyc3.digitaloceanspaces.com", // DigitalOcean Spaces endpoint
  region: "nyc3", // The region for your space
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

// Configure Multer-S3 for file uploads to Spaces
const uploader = (subFolder, fileType, fileSize, err_msg) => {
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "assets-upload", // Use the correct bucket name without a slash
      acl: "public-read", // Permissions for the uploaded file
      key: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName =
          file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") +
          "-" +
          Date.now();
        cb(null, "assets/" + subFolder + "/" + fileName + fileExt); // Save file in the subfolder
      },
    }),
    limits: {
      fileSize: fileSize,
    },
    fileFilter: (req, file, cb) => {
      if (fileType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(err_msg));
      }
    },
  });

  return upload;
};

module.exports = uploader;
