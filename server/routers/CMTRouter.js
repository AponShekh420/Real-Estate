// modules import
const express = require("express");

// internal controllers imported
const addModelsTab = require("../controllers/communityModelsController/addModelsTab");
const updateModelsTab = require("../controllers/communityModelsController/updateModelsTab");
const deleteModelsTab = require("../controllers/communityModelsController/deleteModelsTab");
const uploadModelImg = require("../middleware/uploadModelImg");
const getModels = require("../controllers/communityModelsController/getModels");



// auth checker
const authCheck = require("../middleware/common/users/authCheck");
const adminAuthCheck = require("../middleware/common/users/adminAuthCheck");


// callback function of configure
const router = express.Router();


// route controller
router.get('/get/:id', getModels);
router.post('/add', authCheck, adminAuthCheck, uploadModelImg, addModelsTab);
router.put('/update', authCheck, adminAuthCheck, uploadModelImg, updateModelsTab);
router.delete('/delete', authCheck, adminAuthCheck, deleteModelsTab);



module.exports = router;