const express = require("express");
const passport = require("passport");



const router = express.Router();


router.get('/google/callback', passport.authenticate("google", {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: `${process.env.CLIENT_URL}/login/failed`
}));




module.exports = router;