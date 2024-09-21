// modules import
const express = require("express");

// internal controllers imported
const checkAreaValidation = require("../middleware/checkAreaValidation");
const uploadLocationImg = require("../middleware/uploadLocationImg");
const useLocationValidationResult = require("../middleware/useLocationValidationResult");
const addArea = require("../controllers/areaController/addArea");
const updateArea = require("../controllers/areaController/updateArea");
const deactiveArea = require("../controllers/areaController/deactiveArea");
const activeArea = require("../controllers/areaController/activeArea");
const getAreaBySlug = require("../controllers/areaController/getAreaBySlug");
const getAreas = require("../controllers/areaController/getAreas");
const deleteArea = require("../controllers/areaController/deleteArea");



// auth checker
const authCheck = require("../middleware/common/users/authCheck");
const adminAuthCheck = require("../middleware/common/users/adminAuthCheck");




// callback function of configure
const router = express.Router();


// route controller
router.post('/add', authCheck, adminAuthCheck, uploadLocationImg, checkAreaValidation, useLocationValidationResult, addArea);
router.put('/update', authCheck, adminAuthCheck, uploadLocationImg, checkAreaValidation, useLocationValidationResult, updateArea);
router.delete('/delete', authCheck, adminAuthCheck, deleteArea);

// city deactive and active 
router.put('/deactive', authCheck, adminAuthCheck, deactiveArea);
router.put('/active', authCheck, adminAuthCheck, activeArea);

// get state data to display in frontend page 
router.post("/get-by-slug", getAreaBySlug);


router.get("/getall/:status", getAreas);



module.exports = router;