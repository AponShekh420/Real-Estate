const {check} = require("express-validator");

const checkSubscriberValidation = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .trim(),
]

module.exports = checkSubscriberValidation;