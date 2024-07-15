const {check} = require("express-validator")

const checkCommunityValidation = [
  check("title")
    .isLength({min: 5})
    .withMessage("The title is too short")
    .trim(),
  check("phone")
    .isLength({min: 6})
    .withMessage("Must be a valid phone number")
    .trim(),
  check("address")
    .isLength({min: 3})
    .withMessage("Must be a valid address")
    .trim(),
  check("state")
    .isLength({min: 1})
    .withMessage("Must be select a state")
    .trim(),
  check("city")
    .isLength({min: 1})
    .withMessage("Must be select a city")
    .trim(),
  check("area")
    .isLength({min: 4})
    .withMessage("Must be select a area")
    .trim(),
  check("minPrice")
    .isLength({min: 4})
    .withMessage("Must be a min price")
    .trim(),
  check("maxPrice")
    .isLength({min: 3})
    .withMessage("Must be a max price")
    .trim(),
  check("communitySize")
    .isLength({min: 1})
    .withMessage("Must be a number of community size")
    .trim(),
  check("builtStart")
    .isLength({min: 3})
    .withMessage("The built start date is required")
    .trim(),
  check("builtEnd")
    .isLength({min: 3})
    .withMessage("The built end date is required")
    .trim(),
  check("imgs")
    .custom((item)=> item.length > 0)
    .withMessage("Must be upload a Image")
    .trim(),
  check("status")
    .custom((item)=> item.length > 0)
    .withMessage("Must be Select at least one status")
    .trim(),
  check("homeTypes")
    .custom((item)=> item.length > 0)
    .withMessage("Must be Select at least one home type")
    .trim(),
]

module.exports = checkCommunityValidation;