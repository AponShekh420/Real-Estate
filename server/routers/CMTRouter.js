// modules import
const express = require("express");

// internal controllers imported
const addModelsTab = require("../controllers/communityModelsController/addModelsTab");
const updateModelsTab = require("../controllers/communityModelsController/updateModelsTab");
const deleteModelsTab = require("../controllers/communityModelsController/deleteModelsTab");
const uploadModelImg = require("../middleware/uploadModelImg");
const getModels = require("../controllers/communityModelsController/getModels");

// callback function of configure
const router = express.Router();


// route controller
router.get('/get/:id', getModels);
router.post('/add', uploadModelImg, addModelsTab);
router.put('/update', uploadModelImg, updateModelsTab);
router.delete('/delete', deleteModelsTab);



module.exports = router;