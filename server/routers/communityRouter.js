// modules import
const express = require("express");

// internal controllers imported
const addCommunity = require("../controllers/communityController/addCommunity");
const updateCommuity = require("../controllers/communityController/updateCommunity");
const deleteCommunity = require("../controllers/communityController/deleteCommunity");
const deactiveCommunity = require("../controllers/communityController/deactiveCommunity");
const activeCommunity = require("../controllers/communityController/activeCommunity");
const uploadCommunityImages = require("../controllers/communityController/uploadCommunityImages");
const communityImageDelete = require("../controllers/communityController/communityThumbDeleter");

// callback function of configure
const router = express.Router();


// route controller
router.post('/add', addCommunity);
router.put('/update', updateCommuity);
router.delete('/delete', deleteCommunity);


// community active and deactive
router.put('/deactive', deactiveCommunity);
router.put('/active', activeCommunity);


// community image uploading and deleting
router.post('/upload', uploadCommunityImages);
router.delete('/imgdelete', communityImageDelete);


module.exports = router;