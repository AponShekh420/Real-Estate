// modules import
const express = require("express");

// internal controllers imported
const addState = require("../controllers/stateController/addState");
const updateState = require("../controllers/stateController/updateState");
const deleteState = require("../controllers/stateController/deleteState");
const deactiveState = require("../controllers/stateController/deactiveState");
const activeState = require("../controllers/stateController/activeState");

// callback function of configure
const router = express.Router();


// route controller
router.post('/add', addState);
router.put('/update', updateState);
router.delete('/delete', deleteState);


// state deactive and active
router.put('/deactive', deactiveState);
router.put('/active', activeState);


module.exports = router;