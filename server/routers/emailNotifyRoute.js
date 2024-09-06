const express = require("express")
// callback function of configure
const router = express.Router();

// get message to admin email for "Schedule"
router.post('/schedule/send', getCommunitiesByFilter);

// get message to admin email for "get more info"
router.post('/more-info/send', getCommunitiesByFilter);