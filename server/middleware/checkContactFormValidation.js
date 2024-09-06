const {check} = require("express-validator")

const checkContactFormValidation = [
  check("name")
    .isLength({min: 1})
    .withMessage("The name is required*")
    .isLength({min: 4})
    .withMessage("The name is too short")
    .trim(),
  check("phone")
    .isLength({min: 6})
    .withMessage("Please provide a valid phone number.")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .trim(),
  check("message")
    .isLength({min: 2})
    .withMessage("Please enter a message. This field cannot be left empty or short")
    .trim(),
]

module.exports = checkContactFormValidation;