// modules import
const express = require("express");

// internal controllers imported
const addAmenity = require("../controllers/amenityController/addAmenity");
const checkAmenityValidation = require("../middleware/checkAmenityValidation");
const authCheck = require("../middleware/common/users/authCheck");
const adminAuthCheck = require("../middleware/common/users/adminAuthCheck");

const useValidationResult = require("../middleware/common/useValidationResult");
const updateAmenity = require("../controllers/amenityController/updateAmenity");
const deleteAmenity = require("../controllers/amenityController/deleteAmenity");
const getAmenities = require("../controllers/amenityController/getAmenities");

// callback function of configure
const router = express.Router();


// route controller
router.post('/add', authCheck, adminAuthCheck, checkAmenityValidation, useValidationResult, addAmenity);
router.put('/update', authCheck, adminAuthCheck, checkAmenityValidation, useValidationResult, updateAmenity);
router.delete('/delete', authCheck, adminAuthCheck, deleteAmenity);
router.get('/getall', getAmenities);






module.exports = router;