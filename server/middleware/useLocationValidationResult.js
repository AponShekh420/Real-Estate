const { validationResult } = require("express-validator");
const {unlink} = require("fs");
const path = require("path");
const useLocationValidationResult = (req, res, next) =>  {
    const errors = validationResult(req);
    const mapped = errors.mapped();
    if(Object.keys(mapped).length === 0) {
        // console.log(req.files)
        next();
    } else {
        // console.log("file", req.files)
        if(req.files){
            unlink(path.join(__dirname, `../public/assets/location/${req?.files[0]?.filename}`), (err)=> {
                if(err) {
                    console.log(err)
                }
            })
        }
        res.status(403).json({
            errors: mapped,
        })
    }
};


module.exports = useLocationValidationResult;


