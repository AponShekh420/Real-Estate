const express = require("express");
const sendSchedule = require("../controllers/emailController/sendSchedule");
const sendMoreInfo = require("../controllers/emailController/sendMoreInfo");
const contactForm = require("../controllers/emailController/contactForm");
const checkMoreInfoValidation = require("../middleware/checkMoreInfoValidation");
const checkScheduleValidation = require("../middleware/checkScheduleValidation");
const checkContactFormValidation = require("../middleware/checkContactFormValidation");
const useValidationResult = require("../middleware/common/useValidationResult");



// callback function of configure
const router = express.Router();

// get message to admin email for "Schedule"
router.post('/schedule/send', checkScheduleValidation, useValidationResult, sendSchedule);

// get message to admin email for "get more info"
router.post('/more-info/send', checkMoreInfoValidation, useValidationResult, sendMoreInfo);

// send a message to admin from contact page or form
router.post('/contact/send', checkContactFormValidation, useValidationResult, contactForm);




module.exports = router;