const {check} = require("express-validator")

const checkStateValidation = [
  check("name")
    .isLength({min: 3})
    .withMessage("The name is too short")
    .trim(),
  check("abbreviation")
    .isLength({min: 2})
    .withMessage("Must be a valid abbreviation")
    .trim(),
]

module.exports = checkStateValidation;