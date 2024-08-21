// modules import
const express = require("express");

// internal controllers imported
const useValidationResult = require("../middleware/common/useValidationResult");
const addCatagory = require("../controllers/catagoryController/addCatagory");
const updateCatagory = require("../controllers/catagoryController/updateCatagory");
const deleteCatagory = require("../controllers/catagoryController/deleteCatagory");
const getCatagories = require("../controllers/catagoryController/getCatagories");
const getCatagoryBySlug = require("../controllers/catagoryController/getCatagoryBySlug");
const checkCatagoryValidation = require("../middleware/checkCatagoryValidation");

// callback function of configure
const router = express.Router();


// route controller
router.get('/getall/', getCatagories) // fetch data with active param to get only active data, fetch data with deactive param to get deactive data, and fetch data with anytype param to get both type of data
router.post('/add', checkCatagoryValidation, useValidationResult, addCatagory);
router.put('/update', checkCatagoryValidation, useValidationResult, updateCatagory);
router.delete('/delete', deleteCatagory);

// get catagory data to display in frontend page 
router.post("/get-by-slug", getCatagoryBySlug)


module.exports = router;