// modules import
const express = require("express");

// internal controllers imported
// const getSingleBlog = require("../controllers/blogController/getSingleBlog");
const useValidationResult = require("../middleware/common/useValidationResult");
const checkReviewValidation = require("../middleware/checkReviewValidation");
const addReview = require("../controllers/reviewController/addReview");
const getReviews = require("../controllers/reviewController/getReviews");
const updateReview = require("../controllers/reviewController/updateReview");
const like = require("../controllers/reviewController/like");
const dislike = require("../controllers/reviewController/dislike");
const getAllReviews = require("../controllers/reviewController/getAllReviews");
const approveAndPandingReview = require("../controllers/reviewController/approveAndPandingReview");



// auth checker
const authCheck = require("../middleware/common/users/authCheck");
const adminAuthCheck = require("../middleware/common/users/adminAuthCheck");

// callback function of configure
const router = express.Router();



// router.get('/single-blog/:slug', getSingleBlog);


// route controller
router.post('/add', authCheck, checkReviewValidation, useValidationResult, addReview);
router.put('/update', authCheck, adminAuthCheck, checkReviewValidation, useValidationResult, updateReview);


// like, dislike
router.post('/like', authCheck, like);
router.post('/dislike', authCheck, dislike);



// for community single page
router.get('/get/:communityId', getReviews);


// admin route
router.get('/getall', getAllReviews);
router.put('/approve-panding/:id', approveAndPandingReview);




module.exports = router;