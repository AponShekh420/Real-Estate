const express = require("express");
const login = require("../controllers/usersController/login");
const logout = require("../controllers/usersController/logout");
const register = require("../controllers/usersController/register");
const useValidationResult = require("../middleware/common/useValidationResult");
const checkRegisterValidation = require("../middleware/checkRegisterValidation");
const checkLoginValidation = require("../middleware/checkLoginValidation");


const router = express.Router();


router.post("/login", checkLoginValidation, useValidationResult, login);
router.delete("/logout", logout);
router.post("/register", checkRegisterValidation, useValidationResult, register)

module.exports = router;