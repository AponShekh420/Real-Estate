const {check} = require("express-validator")

const checkAreaValidation = [
  check("name")
    .isLength({min: 3})
    .withMessage("The name is too short")
    .trim(),
  check("stateId")
    .isLength({min: 1})
    .withMessage("Must be select a state")
    .trim(),
]

module.exports = checkAreaValidation;