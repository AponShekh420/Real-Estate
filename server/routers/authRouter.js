const jwt = require('jsonwebtoken');
const express = require("express")
const passport= require("passport")
const axios = require("axios")
const UserModel = require("../models/UserModel")
const tokenGenerator = require("../helpers/tokenGenerator")
const dotenv = require("dotenv");

dotenv.config();


const router = express.Router()

//authenticate the user using google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: `${process.env.CLIENT_URL}/login/failed`,
  })
)

//forward the request to goggle's authentication server
router.get("/google", passport.authenticate('google', { scope: ['profile'] }))

//register or login user to DB
router.get("/login/success", async (req, res) => {
  const {session} = req.cookies;

  if (req.user) {
    const userExists = await UserModel.findOne({ email: req.user._json.email })
    if (userExists) {
      tokenGenerator(res, userExists)
    } else {
      const newUser = new UserModel({
        firstName: req.user._json.given_name,
        lastName: req.user._json.family_name,
        provider: req.user.provider,
        accountId: req.user.id,
        avatar: req.user._json.picture,
        role: "viewer",
        email: req.user._json.email,
        password: Date.now(), //dummy password
      })
      tokenGenerator(res, newUser)
      await newUser.save()
    }
    res.status(200).json({
      user: { 
        firstName: req.user._json.given_name,
        lastName: req.user._json.family_name,
        provider: req.user.provider,
        accountId: req.user.id,
        avatar: req.user._json.picture,
        role: "viewer",
        email: req.user._json.email,
        role: userExists?.role || "viewer",
        _id: userExists?._id,
      },
      msg: "Succesfully logged in",
    })
  } else if(session) {
    const verifyedToken = jwt.verify(session, process.env.TOKEN_SECRET)
    if(verifyedToken) {
      const checkValidation = await UserModel.findOne({_id: verifyedToken.id, email: verifyedToken.email}, '-password');
      if(checkValidation) {
        res.status(200).json({
          user: verifyedToken,
          msg: "Succesfully logged in",
        })
      } else {
        res.status(403).json({
          msg: "Not Authorized",
        })
      }
    } else {
      res.status(403).json({
        msg: "Not Authorized",
      })
    }
  } else {
    res.status(403).json({
      msg: "Not Authorized",
    })
  }
})

//login failed
router.get("/login/failed", (req, res) => {
  res.status(401)
  throw new Error("Login Failed")
})

//logout
router.get("/logout", (req, res) => {
  res.clearCookie("session");
  req.logout(err => {
    if (err) {
      console.log(err)
    }
    res.redirect("/")
  })
})

module.exports = router;