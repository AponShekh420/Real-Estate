const express = require('express');
const router = express.Router();
const toggleWishlist = require('../controllers/wishlistController/wishlistToggle');
const authCheck = require('../middleware/common/users/authCheck');
const getWishlist = require('../controllers/wishlistController/getWishlist');

// Toggle wishlist (add/remove)
router.post('/toggle', authCheck, toggleWishlist);
router.get('/get', authCheck, getWishlist); // Get wishlist


module.exports = router;
