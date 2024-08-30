const {check} = require("express-validator");
const UserModel = require("../models/UserModel");

const checkRestPasswordValidation = [
  check('password')
    .isStrongPassword()
    .withMessage('Password must be at 8 charactor long & should contain at least 3 lowercase, 3 uppercase, 3 number, & 3 symbol')
    .trim(),
]

module.exports = checkRestPasswordValidation;