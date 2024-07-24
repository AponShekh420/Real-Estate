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
const checkBlogValidation = require("../middleware/checkBlogValidation copy");

// callback function of configure
const router = express.Router();



router.get('/single-blog/:slug', getSingleBlog);


// route controller
router.post('/add', checkBlogValidation, useValidationResult, addBlog);
router.put('/update', checkBlogValidation, useValidationResult, useBlogImgDeletor, updateBlog);
router.delete('/delete', deleteBlog);



// blog image uploading and deleting
router.post('/upload', uploadBlogImage);
router.delete('/imgdelete', blogImgDelete);



// get the blogs by auther/catagory/subcatagory/title
router.post('/get-blogs', getBlogs)


module.exports = router;