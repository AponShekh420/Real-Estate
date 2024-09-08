// modules import
const express = require("express");

// internal controllers imported
const addCommunity = require("../controllers/communityController/addCommunity");
const updateCommuity = require("../controllers/communityController/updateCommunity");
const deleteCommunity = require("../controllers/communityController/deleteCommunity");
const deactiveCommunity = require("../controllers/communityController/deactiveCommunity");
const activeCommunity = require("../controllers/communityController/activeCommunity");
const uploadCommunityImages = require("../controllers/communityController/uploadCommunityImages");
const getSingleCommunity = require("../controllers/communityController/getSingleCommunity");
const communityImageDelete = require("../controllers/communityController/communityImgDelete");
const useCommunityImgsDeletor = require("../middleware/useCommunityImgsDeletor");
const getCommunities = require("../controllers/communityController/getCommunities");
const checkCommunityValidation = require("../middleware/checkCommunityValidation");
const useValidationResult = require("../middleware/common/useValidationResult");
const getCommunitiesByFilter = require("../controllers/communityController/getCommunitiesByFilter");
const getCommunitiesForMap = require("../controllers/communityController/getCommunitiesForMap");



// auth checker
const authCheck = require("../middleware/common/users/authCheck");
const adminAuthCheck = require("../middleware/common/users/adminAuthCheck");



// callback function of configure
const router = express.Router();



router.get('/single-community/:slug', getSingleCommunity);


// route controller
router.post('/add', authCheck, adminAuthCheck, checkCommunityValidation, useValidationResult, addCommunity);
router.put('/update', authCheck, adminAuthCheck, checkCommunityValidation, useValidationResult, useCommunityImgsDeletor, updateCommuity);
router.delete('/delete', authCheck, adminAuthCheck, deleteCommunity);


// community active and deactive
router.put('/deactive', authCheck, adminAuthCheck, deactiveCommunity);
router.put('/active', authCheck, adminAuthCheck, activeCommunity);


// community image uploading and deleting
router.post('/upload', authCheck, adminAuthCheck, uploadCommunityImages);
router.delete('/imgdelete', authCheck, adminAuthCheck, communityImageDelete);



// get the communities by area/city/state/title
router.post('/get-communities', getCommunities)



// get data for display on frontend page 
router.post('/get-by-filter', getCommunitiesByFilter);
router.get('/get-for-map', getCommunitiesForMap);


module.exports = router;