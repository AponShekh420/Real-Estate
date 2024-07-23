const {check} = require("express-validator")

const checkSubcatagoryValidation = [
  check("name")
    .isLength({min: 3})
    .withMessage("The subcatagory name is too short")
    .trim(),
  check("catagoryId")
    .isLength({min: 1})
    .withMessage("Must be select a parent catagory")
    .trim(),
]

module.exports = checkSubcatagoryValidation;