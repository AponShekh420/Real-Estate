const {check} = require("express-validator")

const checkCityValidation = [
  check("name")
    .isLength({min: 3})
    .withMessage("The name is too short")
    .trim(),
  check("abbreviation")
    .isLength({min: 2})
    .withMessage("Must be a valid abbreviation")
    .trim(),
  check("stateId")
    .isLength({min: 1})
    .withMessage("Must be select a state")
    .trim(),
  check("cityId")
    .isLength({min: 1})
    .withMessage("Must be select a city")
    .trim(),
]

module.exports = checkCityValidation;