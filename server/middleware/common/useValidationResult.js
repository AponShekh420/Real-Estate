const { validationResult } = require("express-validator");

const useValidationResult = (req, res, next) =>  {
    const errors = validationResult(req);
    const mapped = errors.mapped();
    if(Object.keys(mapped).length === 0) {
        next();
    } else {
        res.status(403).json({
            errors: mapped,
        })
    }
};


module.exports = useValidationResult;


