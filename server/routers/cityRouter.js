// modules import
const express = require("express");

// internal controllers imported
const addCity = require("../controllers/cityController/addCity");
const updateCity = require("../controllers/cityController/updateCity");
const deleteCity = require("../controllers/cityController/deleteCity");
const deactiveCity = require("../controllers/cityController/deactiveCity");
// const updateState = require("../controllers/stateController/updateState");
// const deleteState = require("../controllers/stateController/deleteState");

// callback function of configure
const router = express.Router();


// route controller
router.post('/add', addCity);
router.put('/update', updateCity);
router.delete('/delete', deleteCity);

// city deactive and active 
router.put('/deactive', deactiveCity);


module.exports = router;