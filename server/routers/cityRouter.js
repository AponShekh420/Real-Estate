// modules import
const express = require("express");

// internal controllers imported
const checkCityValidation = require("../middleware/checkCityValidation");
const uploadLocationImg = require("../middleware/uploadLocationImg");
const useLocationValidationResult = require("../middleware/useLocationValidationResult");
const addCity = require("../controllers/cityController/addCity");
const updateCity = require("../controllers/cityController/updateCity");
const deactiveCity = require("../controllers/cityController/deactiveCity");
const activeCity = require("../controllers/cityController/activeCity");
const getCityBySlug = require("../controllers/cityController/getCityBySlug");
const deleteCity = require("../controllers/cityController/deleteCity");


// auth checker
const authCheck = require("../middleware/common/users/authCheck");
const adminAuthCheck = require("../middleware/common/users/adminAuthCheck");


// callback function of configure
const router = express.Router();


// route controller
router.post('/add', authCheck, adminAuthCheck, uploadLocationImg, checkCityValidation, useLocationValidationResult, addCity);
router.put('/update', authCheck, adminAuthCheck, uploadLocationImg, checkCityValidation, useLocationValidationResult, updateCity);
router.delete('/delete', authCheck, adminAuthCheck, deleteCity);


// active and deactive
router.put('/deactive', authCheck, adminAuthCheck, deactiveCity);
router.put('/active', authCheck, adminAuthCheck, activeCity);



// get state data to display in frontend page 
router.post("/get-by-slug", getCityBySlug);


module.exports = router;