const {check} = require("express-validator")

const checkReviewValidation = [
  check("rating")
    .isLength({min: 1})
    .withMessage("Rating is required")
    .trim(),
  check("review")
    .isLength({min: 3})
    .withMessage("Please provide your written feedback.")
    .trim(),
]

module.exports = checkReviewValidation;