const express = require("express");
const login = require("../controllers/usersController/login");
const logout = require("../controllers/usersController/logout");
const register = require("../controllers/usersController/register");
const useValidationResult = require("../middleware/common/useValidationResult");
const checkRegisterValidation = require("../middleware/checkRegisterValidation");
const checkLoginValidation = require("../middleware/checkLoginValidation");
const authCheck = require("../middleware/common/users/authCheck");
const getUser = require("../controllers/usersController/getUser");


const router = express.Router();


router.post("/login", checkLoginValidation, useValidationResult, login);
router.delete("/logout", authCheck, logout);
router.post("/register", checkRegisterValidation, useValidationResult, register)
router.get("/get", authCheck, getUser)

module.exports = router;