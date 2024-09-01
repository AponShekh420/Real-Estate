const {check} = require("express-validator");

const checkChangePasswordValidation = [
  check('password')
    .isStrongPassword()
    .withMessage('Password must be at 8 charactor long & should contain at least 3 lowercase, 3 uppercase, 3 number, & 3 symbol')
    .trim(),
  check('oldPassword')
  .isLength({min: 3})
  .withMessage('Current password must be provided.')
  .trim(),
]

module.exports = checkChangePasswordValidation;