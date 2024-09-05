const {check} = require("express-validator")

const checkCommentValidation = [
  check("text")
    .isLength({min: 3})
    .withMessage("Please provide your written feedback.")
    .trim(),
]

module.exports = checkCommentValidation;