const {check} = require("express-validator");
const UserModel = require("../../../models/UserModel");

const checkRegisterValidation = [
  check("firstName")
    .isLength({min: 2})
    .withMessage('First name is required')
    .isAlpha('en-US', {ignore: ' -'})
    .withMessage('There should be nothing but alphabets')
    .trim(),
  check("lastName")
    .isLength({min: 2})
    .withMessage('Last name is required')
    .isAlpha('en-US', {ignore: ' -'})
    .withMessage('There should be nothing but alphabets')
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((email) => {
      return UserModel.findOne({email}).then(user => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    })
    .trim(),
  check('password')
    .isStrongPassword()
    .withMessage('Password must be at 8 charactor long & should contain at least 3 lowercase, 3 uppercase, 3 number, & 3 symbol')
    .trim(),
]

module.exports = checkRegisterValidation;