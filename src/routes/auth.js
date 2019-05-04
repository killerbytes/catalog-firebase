import passport from "passport";
import * as User from "../services/users";
import express from "express";
const jwt = require("jsonwebtoken");
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";

const router = express.Router();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:9000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      delete profile._json;
      delete profile._raw;
      User.findOrCreate(profile).then(res => {
        done(null, res);
      });
    }
  )
);

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get(
  "/login",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    const token = jwt.sign(req.user, process.env.SECRET_KEY);

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      console.log(decoded);
    });

    res.send({ token });

    // res.redirect("http://localhost:3000/callback?token=" + token);
  }
);

module.exports = router;
