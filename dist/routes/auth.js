"use strict";

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _users = require("../services/users");

var User = _interopRequireWildcard(_users);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _passportGoogleOauth = require("passport-google-oauth");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwt = require("jsonwebtoken");


var router = _express2.default.Router();
_passport2.default.use(new _passportGoogleOauth.OAuth2Strategy({
  clientID: "263383268319-n50o74ll0j2n3qmae6u5375h52rrasn9.apps.googleusercontent.com",
  clientSecret: "LhhGjLuwr9TdRLy5N66HlBz9",
  callbackURL: "http://localhost:9000/auth/google/callback"
}, function (accessToken, refreshToken, profile, done) {
  delete profile._json;
  delete profile._raw;
  User.findOrCreate(profile).then(function (res) {
    done(null, res);
  });
}));

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/login", _passport2.default.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login"]
}));

router.get("/google/callback", _passport2.default.authenticate("google", { failureRedirect: "/login" }), function (req, res) {
  var token = jwt.sign(req.user, "azidburn!@#123");

  jwt.verify(token, "azidburn!@#123", function (err, decoded) {
    console.log(decoded);
  });

  res.send({ token: token });

  // res.redirect("http://localhost:3000/callback?token=" + token);
});

module.exports = router;