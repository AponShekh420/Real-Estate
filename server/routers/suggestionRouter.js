// modules import
const express = require("express");

// internal controllers imported
const getSuggestion = require("../controllers/searchSuggestionController.js/getSuggestion");




// callback function of configure
const router = express.Router();


// route controller
router.post('/search', getSuggestion)



module.exports = router;