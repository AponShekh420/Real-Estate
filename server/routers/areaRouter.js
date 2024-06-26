// modules import
const express = require("express");

// internal controllers imported
const addArea = require("../controllers/areaController/addArea");
const updateArea = require("../controllers/areaController/updateArea");
const deleteArea = require("../controllers/areaController/deleteArea");
const deactiveArea = require("../controllers/areaController/deactiveArea");

// callback function of configure
const router = express.Router();


// route controller
router.post('/add', addArea);
router.put('/update', updateArea);
router.delete('/delete', deleteArea);


// active and deactive
router.put('/deactive', deactiveArea)

module.exports = router;