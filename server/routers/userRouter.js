const express = require("express");
const login = require("../controllers/usersController/login");
const logout = require("../controllers/usersController/logout");
const register = require("../controllers/usersController/register");
const useValidationResult = require("../middleware/common/useValidationResult");
const checkRegisterValidation = require("../middleware/common/users/checkRegisterValidation");
const checkLoginValidation = require("../middleware/common/users/checkLoginValidation");
const checkRestPasswordValidation = require("../middleware/common/users/checkRestPasswordValidation");
const authCheck = require("../middleware/common/users/authCheck");
const getUser = require("../controllers/usersController/getUser");
const forgotPassword = require("../controllers/usersController/forgotPassword");
const resetPassword = require("../controllers/usersController/resetPassword");
const changePassword = require("../controllers/usersController/changePassword");
const checkChangePasswordValidation = require("../middleware/common/users/checkChangePasswordValidation");
const uploadAvatar = require("../middleware/common/users/uploadAvatar");
const updateProfile = require("../controllers/usersController/updateProfile");
const getUsers = require("../controllers/usersController/getUsers");
const deleteUser = require("../controllers/usersController/deleteUser");


const router = express.Router();


router.post("/login", checkLoginValidation, useValidationResult, login);
router.delete("/logout", authCheck, logout);
router.post("/register", checkRegisterValidation, useValidationResult, register)
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:resetToken", checkRestPasswordValidation, useValidationResult, resetPassword);
router.patch("/change-password", authCheck, checkChangePasswordValidation, useValidationResult, changePassword);
router.put("/profile-update", authCheck, uploadAvatar, updateProfile);


// admin route
router.get("/get/:id", authCheck, getUser)
router.post("/get-users", authCheck, getUsers);
router.delete("/delete/:id", authCheck, deleteUser);




module.exports = router;