// modules import
const express = require("express");

// internal controllers imported
const addArea = require("../controllers/areaController/addArea");
// const updateState = require("../controllers/stateController/updateState");
// const deleteState = require("../controllers/stateController/deleteState");

// callback function of configure
const router = express.Router();


// route controller
router.post('/add', addArea);
// router.put('/update', updateState);
// router.delete('/delete', deleteState);

module.exports = router;