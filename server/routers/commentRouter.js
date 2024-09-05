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
const getComments = require("../controllers/CommentController/getComment");
const addComment = require("../controllers/CommentController/addComment");
const updateComment = require("../controllers/CommentController/updateComment");
const checkCommentValidation = require("../middleware/checkCommentValidation");

// callback function of configure
const router = express.Router();



// route controller
router.post('/add', authCheck, checkCommentValidation, useValidationResult, addComment);
router.put('/update', authCheck, checkCommentValidation, useValidationResult, updateComment);


// like, dislike
router.post('/like', authCheck, like);
router.post('/dislike', authCheck, dislike);



// for community single page
router.get('/get/:blogId', getComments);



module.exports = router;