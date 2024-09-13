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

const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');

// Configure AWS SDK for DigitalOcean Spaces
const s3 = new aws.S3({
    endpoint: new aws.Endpoint('nyc3.digitaloceanspaces.com'), // Use your region's endpoint
    accessKeyId: process.env.DO_SPACES_KEY,  // Store your keys in environment variables
    secretAccessKey: process.env.DO_SPACES_SECRET,
});

// Configure Multer-S3 for file uploads to Spaces
const uploader = (subFolder, fileType, fileSize, err_msg) => {

    const upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: 'assets-upload/' + subFolder, // Your Space name and subfolder
            acl: 'public-read', // Permissions for the uploaded file
            key: (req, file, cb) => {
                const fileExt = path.extname(file.originalname);
                const fileName = file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-') + "-" + Date.now();
                cb(null, fileName + fileExt); // Save file with timestamp
            }
        }),
        limits: {
            fileSize: fileSize,
        },
        fileFilter: (req, file, cb) => {
            if(fileType.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error(err_msg));
            }
        }
    });

    return upload;
};

module.exports = uploader;
