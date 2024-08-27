// modules import
const express = require("express");

// internal controllers imported
// const getSingleBlog = require("../controllers/blogController/getSingleBlog");
const useValidationResult = require("../middleware/common/useValidationResult");
const authCheck = require("../middleware/common/users/authCheck");
const checkReviewValidation = require("../middleware/checkReviewValidation");
const addReview = require("../controllers/reviewController/addReview");
const getReviews = require("../controllers/reviewController/getReviews");
const updateReview = require("../controllers/reviewController/updateReview");
const like = require("../controllers/reviewController/like");
const dislike = require("../controllers/reviewController/dislike");
const removeLike = require("../controllers/reviewController/removeLike");

// callback function of configure
const router = express.Router();



// router.get('/single-blog/:slug', getSingleBlog);


// route controller
router.post('/add', authCheck, checkReviewValidation, useValidationResult, addReview);
router.put('/update', authCheck, checkReviewValidation, useValidationResult, updateReview);


// like, dislike
router.post('/like', authCheck, like);
router.post('/dislike', authCheck, dislike);



// type "all" as params to get all type data, type "active" to get only active data and type 'deactive' for only deactive data
router.get('/get/:status', getReviews);



module.exports = router;