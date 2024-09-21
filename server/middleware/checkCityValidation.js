const {check} = require("express-validator")

const checkCityValidation = [
  check("name")
    .isLength({min: 3})
    .withMessage("The name is too short")
    .trim(),
  check("stateId")
    .isLength({min: 1})
    .withMessage("Must be select a state")
    .trim(),
  check("areaId")
    .isLength({min: 1})
    .withMessage("Must be select a Area")
    .trim(),
]

module.exports = checkCityValidation;