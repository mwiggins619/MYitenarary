const JwtStrategy = require("passport-jwt").Strategy;
const passport = require('passport');
const ExtractJwt = require("passport-jwt").ExtractJwt;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const userModel = require("./model/userModel");
const keys = require("./keys");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userModel.findById(id).then((user) => {
    done(null, user);
  });
});

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      userModel
        .findById(jwt_payload.id)
        .then(user => {
          console.log('user', user)
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "352999401573-jcep0lnj6ujsubt1kanrted2bv96e307.apps.googleusercontent.com",
        clientSecret: "NDZEvxFKhQpoijBBXX-_Gzcl",
        callbackURL: "http://localhost:5000/api/users/auth/google/callback"
      },

      function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        userModel.findOne({ email: profile.emails[0].value }).then(user => {
          if (user) {
            // already have this user
            console.log('user is: ', user);
            done(null, user);
          } else {
            // if not, create user in our db
            console.log('new user');
            //add user in mongoDB acording to your user model...
            new userModel({
              name: profile.displayName,
              picture: profile.photos[0].value,
              email: profile.emails[0].value,
              password: ""
            }).save().then((newUser) => {
              console.log('created new user: ', newUser);
              done(null, newUser);
            });
          }
        })
      }));
}

