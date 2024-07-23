const {check} = require("express-validator")

const checkCatagoryValidation = [
  check("name")
    .isLength({min: 3})
    .withMessage("The catagory name is too short")
    .trim(),
]

module.exports = checkCatagoryValidation;