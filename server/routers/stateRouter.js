// modules import
const express = require("express");

// internal controllers imported
const addState = require("../controllers/stateController/addState");
const getStatesOnlyWithCommunities = require("../controllers/stateController/getStatesOnlyWithCommunities");
const updateState = require("../controllers/stateController/updateState");
const deleteState = require("../controllers/stateController/deleteState");
const deactiveState = require("../controllers/stateController/deactiveState");
const activeState = require("../controllers/stateController/activeState");
const getState = require("../controllers/stateController/getState");
const checkStateValidation = require("../middleware/checkStateValidation");
const getStateBySlug = require("../controllers/stateController/getStateBySlug");
const uploadLocationImg = require("../middleware/uploadLocationImg");
const useLocationValidationResult = require("../middleware/useLocationValidationResult");



// auth checker
const authCheck = require("../middleware/common/users/authCheck");
const adminAuthCheck = require("../middleware/common/users/adminAuthCheck");



// callback function of configure
const router = express.Router();


// route controller
router.get('/getall/:status', getState) // fetch data with active param to get only active data, fetch data with deactive param to get deactive data, and fetch data with anytype param to get both type of data
router.post('/add', authCheck, adminAuthCheck, uploadLocationImg, checkStateValidation, useLocationValidationResult, addState);
router.put('/update', authCheck, adminAuthCheck, uploadLocationImg, checkStateValidation, useLocationValidationResult, updateState);
router.delete('/delete', authCheck, adminAuthCheck, deleteState);


// state deactive and active
router.put('/deactive', authCheck, adminAuthCheck, deactiveState);
router.put('/active', authCheck, adminAuthCheck, activeState);


// get state data to display in frontend page 
router.post("/get-by-slug", getStateBySlug);

router.get('/get-only-with-communities', getStatesOnlyWithCommunities);



module.exports = router;