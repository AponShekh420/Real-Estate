const path = require('path')
const multer = require('multer')
const createHttpError = require('http-errors')

const uploader = (subFolder, fileType, fileSize, err_msg) => {

    const UPLOAD_FILE = path.join(__dirname, `/../public/assets/${subFolder}`);

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOAD_FILE);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-') + "-" + Date.now();
            cb(null, fileName + fileExt);
        }
    })


    const uplaod = multer({
        storage: storage,
        limits: {
            fileSize: fileSize,
        },
        fileFilter: (req, file, cb) => {
            if(fileType.includes(file.mimetype)) {
                cb(null, true)
            } else {
                cb(createHttpError(err_msg))
            }
        }
    })


    return uplaod;
}


module.exports = uploader;