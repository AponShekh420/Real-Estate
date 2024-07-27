const session = require('express-session');
const passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

const passport = (app) => {

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
      }
    })
  )

  app.use(passport.initialize());
  app.use(passport.session())

  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"]
  },
    function(accessToken, refreshToken, profile, cb) {
      cb(null, profile)
    }
  ));

  passport.serializeUser((user, done)=> {
    done(null, user)
  });
  passport.deserializeUser((user, done)=> {
    done(null, user)
  });
}

module.exports = passport;