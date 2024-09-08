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


// auth checker
const authCheck = require("../middleware/common/users/authCheck");
const contributorOrAdminAuthCheck = require("../middleware/common/users/contributorOrAdminAuthCheck");



// callback function of configure
const router = express.Router();


// route controller
router.get('/getall/', getCatagories) // fetch data with active param to get only active data, fetch data with deactive param to get deactive data, and fetch data with anytype param to get both type of data
router.post('/add', authCheck, contributorOrAdminAuthCheck, checkCatagoryValidation, useValidationResult, addCatagory);
router.put('/update', authCheck, contributorOrAdminAuthCheck, checkCatagoryValidation, useValidationResult, updateCatagory);
router.delete('/delete', authCheck, contributorOrAdminAuthCheck, deleteCatagory);

// get catagory data to display in frontend page 
router.post("/get-by-slug", getCatagoryBySlug)


module.exports = router;