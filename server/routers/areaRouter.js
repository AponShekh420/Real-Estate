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


// callback function of configure
const router = express.Router();


// route controller
router.post('/add', checkAreaValidation, useValidationResult, addArea);
router.put('/update', checkAreaValidation, useValidationResult, updateArea);
router.delete('/delete', deleteArea);


// active and deactive
router.put('/deactive', deactiveArea);
router.put('/active', activeArea);



// get state data to display in frontend page 
router.post("/get-by-slug", getAreaBySlug);


module.exports = router;