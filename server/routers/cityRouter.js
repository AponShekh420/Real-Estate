// modules import
const express = require("express");

// internal controllers imported
const addCity = require("../controllers/cityController/addCity");
const updateCity = require("../controllers/cityController/updateCity");
const deleteCity = require("../controllers/cityController/deleteCity");
const deactiveCity = require("../controllers/cityController/deactiveCity");
const activeCity = require("../controllers/cityController/activeCity");
const checkCityValidation = require("../middleware/checkCityValidation");
const useValidationResult = require("../middleware/common/useValidationResult");
const getCityBySlug = require("../controllers/cityController/getCityBySlug");
const uploadLocationImg = require("../middleware/uploadLocationImg");
const useLocationValidationResult = require("../middleware/useLocationValidationResult");
const getCities = require("../controllers/cityController/getCities");


// callback function of configure
const router = express.Router();


// route controller
router.post('/add', uploadLocationImg, checkCityValidation, useLocationValidationResult, addCity);
router.put('/update', uploadLocationImg, checkCityValidation, useLocationValidationResult, updateCity);
router.delete('/delete', deleteCity);

// city deactive and active 
router.put('/deactive', deactiveCity);
router.put('/active', activeCity);

// get state data to display in frontend page 
router.post("/get-by-slug", getCityBySlug);


router.get("/getall", getCities);



module.exports = router;