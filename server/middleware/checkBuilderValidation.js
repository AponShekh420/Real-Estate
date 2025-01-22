const { check } = require("express-validator");

const checkBuilderValidation = [
  check("name")
    .isLength({ min: 2 })
    .withMessage("The name is too short")
    .trim(),
];

module.exports = checkBuilderValidation;
