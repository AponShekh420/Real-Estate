// modules import
const express = require("express");

// internal controllers imported
const addSubcatagory = require("../controllers/subcatagoryController/addSubcatagory");
const updateSubcatagory = require("../controllers/subcatagoryController/updateSubcatagory");
const deleteSubcatagory = require("../controllers/subcatagoryController/deleteSubcatagory");
const checkSubcatagoryValidation = require("../middleware/checkSubcatagoryValidation");
const useValidationResult = require("../middleware/common/useValidationResult");

// callback function of configure
const router = express.Router();


// route controller
router.post('/add', checkSubcatagoryValidation, useValidationResult, addSubcatagory);
router.put('/update', checkSubcatagoryValidation, useValidationResult, updateSubcatagory);
router.delete('/delete', deleteSubcatagory);



module.exports = router;