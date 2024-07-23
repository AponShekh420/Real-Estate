// modules import
const express = require("express");

// internal controllers imported
const addState = require("../controllers/stateController/addState");
const updateState = require("../controllers/stateController/updateState");
const deleteState = require("../controllers/stateController/deleteState");
const deactiveState = require("../controllers/stateController/deactiveState");
const activeState = require("../controllers/stateController/activeState");
const getState = require("../controllers/stateController/getState");
const checkStateValidation = require("../middleware/checkStateValidation");
const useValidationResult = require("../middleware/common/useValidationResult");

// callback function of configure
const router = express.Router();


// route controller
router.get('/getall/:status', getState) // fetch data with active param to get only active data, fetch data with deactive param to get deactive data, and fetch data with anytype param to get both type of data
router.post('/add', checkStateValidation, useValidationResult, addState);
router.put('/update', checkStateValidation, useValidationResult, updateState);
router.delete('/delete', deleteState);


// state deactive and active
router.put('/deactive', deactiveState);
router.put('/active', activeState);


module.exports = router;