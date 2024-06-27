// modules import
const express = require("express");

// internal controllers imported
const addModelsTab = require("../controllers/communityModelsController/addModelsTab");
const updateModelsTab = require("../controllers/communityModelsController/updateModelsTab");
const deleteModelsTab = require("../controllers/communityModelsController/deleteModelsTab");

// callback function of configure
const router = express.Router();


// route controller
router.post('/add', addModelsTab);
router.put('/update', updateModelsTab);
router.delete('/delete', deleteModelsTab);


module.exports = router;