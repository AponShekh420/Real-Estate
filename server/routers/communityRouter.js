// modules import
const express = require("express");

// internal controllers imported
const addCommunity = require("../controllers/communityController/addCommunity");
// const updateState = require("../controllers/stateController/updateState");

// callback function of configure
const router = express.Router();


// route controller
router.post('/add', addCommunity);
// router.put('/update', updateState);
// router.delete('/delete', deleteState);

module.exports = router;