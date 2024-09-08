// modules import
const express = require("express");

// internal controllers imported
const addBlog = require("../controllers/blogController/addBlog");
const updateBlog = require("../controllers/blogController/updateBlog");
const deleteBlog = require("../controllers/blogController/deleteBlog");
const uploadBlogImage = require("../controllers/blogController/uploadBlogImage");
const getBlogs = require("../controllers/blogController/getBlogs");
const blogImgDelete = require("../controllers/blogController/blogImgDelete");
const getSingleBlog = require("../controllers/blogController/getSingleBlog");
const checkCommunityValidation = require("../middleware/checkCommunityValidation");
const useValidationResult = require("../middleware/common/useValidationResult");
const useBlogImgDeletor = require("../middleware/useBlogImgDeletor");
const checkBlogValidation = require("../middleware/checkBlogValidation");
const getBlogsByFilter = require("../controllers/blogController/getBlogsByFilter");



// auth checker
const authCheck = require("../middleware/common/users/authCheck");
const contributorOrAdminAuthCheck = require("../middleware/common/users/contributorOrAdminAuthCheck");




// callback function of configure
const router = express.Router();



router.get('/single-blog/:slug', getSingleBlog);


// route controller
router.post('/add', authCheck, contributorOrAdminAuthCheck, checkBlogValidation, useValidationResult, addBlog);
router.put('/update', authCheck, contributorOrAdminAuthCheck, checkBlogValidation, useValidationResult, useBlogImgDeletor, updateBlog);
router.delete('/delete', authCheck, contributorOrAdminAuthCheck, deleteBlog);



// blog image uploading and deleting
router.post('/upload', authCheck, contributorOrAdminAuthCheck, uploadBlogImage);
router.delete('/imgdelete', authCheck, contributorOrAdminAuthCheck, blogImgDelete);



// get the blogs by auther/catagory/subcatagory/title
router.post('/get-blogs', authCheck, getBlogs);


// get all blog by filter 
router.post('/get-by-filter', getBlogsByFilter)


module.exports = router;