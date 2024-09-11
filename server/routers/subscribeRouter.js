// modules import
const express = require("express");

// internal controllers imported
const useValidationResult = require("../middleware/common/useValidationResult");
const checkSubscriberValidation = require("../middleware/checkSubscriberValidation");


// auth checker
const authCheck = require("../middleware/common/users/authCheck");
const adminAuthCheck = require("../middleware/common/users/adminAuthCheck");
const addSubscriber = require("../controllers/subscribeController/addSubscriber");
const deleteSubscriber = require("../controllers/subscribeController/deleteSubscriber");
const getSubscribers = require("../controllers/subscribeController/getSubscribers");



// callback function of configure
const router = express.Router();


// route controller
router.post('/getall', authCheck, adminAuthCheck, useValidationResult, getSubscribers)
router.post('/add', checkSubscriberValidation, useValidationResult, addSubscriber);
router.delete('/delete/:id', authCheck, adminAuthCheck, useValidationResult, deleteSubscriber);


module.exports = router;