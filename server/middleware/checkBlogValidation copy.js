const {check} = require("express-validator")

const checkBlogValidation = [
  check("title")
    .isLength({min: 5})
    .withMessage("The title is too short")
    .trim(),
  check("desc")
    .isLength({min: 6})
    .withMessage("The description is too short")
    .trim(),
  check("img")
    .isLength({min: 1})
    .withMessage("Must be upload a Image")
    .trim(),
]

module.exports = checkBlogValidation;