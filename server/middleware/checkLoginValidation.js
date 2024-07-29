const {check} = require("express-validator");

const checkLoginValidation = [
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim(),
  check("password")
    .isLength({min: 8})
    .withMessage('Password is required')
    .trim()
]

module.exports = checkLoginValidation;