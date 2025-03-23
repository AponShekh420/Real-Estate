// modules import
const express = require("express");

// internal controllers imported
const getSuggestion = require("../controllers/searchSuggestionController.js/getSuggestion");
const getSearchResults = require("../controllers/searchResultsController/getSearchResults");




// callback function of configure
const router = express.Router();


// route controller
router.post('/search', getSuggestion)
router.post('/results', getSearchResults)



module.exports = router;