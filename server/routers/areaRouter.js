// modules import
const express = require("express");

// internal controllers imported
const addArea = require("../controllers/areaController/addArea");
const updateArea = require("../controllers/areaController/updateArea");
const deleteArea = require("../controllers/areaController/deleteArea");
const deactiveArea = require("../controllers/areaController/deactiveArea");
const activeArea = require("../controllers/areaController/activeArea");
const checkAreaValidation = require("../middleware/checkAreaValidation");
const useValidationResult = require("../middleware/common/useValidationResult");
const getAreaBySlug = require("../controllers/areaController/getAreaBySlug");
const uploadLocationImg = require("../middleware/uploadLocationImg");
const useLocationValidationResult = require("../middleware/useLocationValidationResult");



// auth checker
const authCheck = require("../middleware/common/users/authCheck");
const adminAuthCheck = require("../middleware/common/users/adminAuthCheck");



// callback function of configure
const router = express.Router();


// route controller
router.post('/add', authCheck, adminAuthCheck, uploadLocationImg, checkAreaValidation, useLocationValidationResult, addArea);
router.put('/update', authCheck, adminAuthCheck, uploadLocationImg, checkAreaValidation, useLocationValidationResult, updateArea);
router.delete('/delete', authCheck, adminAuthCheck, deleteArea);


// active and deactive
router.put('/deactive', authCheck, adminAuthCheck, deactiveArea);
router.put('/active', authCheck, adminAuthCheck, activeArea);



// get state data to display in frontend page 
router.post("/get-by-slug", getAreaBySlug);


module.exports = router;