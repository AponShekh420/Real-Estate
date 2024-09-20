const { validationResult } = require("express-validator");
const deleteFileFromSpace = require("../utils/deleteFileFromSpace");

const useLocationValidationResult = async (req, res, next) =>  {
    const errors = validationResult(req);
    const mapped = errors.mapped();
    if(Object.keys(mapped).length === 0) {
        // console.log(req.files)
        next();
    } else {
        // console.log("file", req.files)
        if(req.files){
          await deleteFileFromSpace('assets-upload', req?.files[0]?.location);
        }
        res.status(403).json({
            errors: mapped,
        })
    }
};


module.exports = useLocationValidationResult;


