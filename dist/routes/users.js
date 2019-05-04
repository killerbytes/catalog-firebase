"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _users = require("../services/users");

var Users = _interopRequireWildcard(_users);

var _utils = require("../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/", function (req, res) {
  var id = (0, _utils.tokenId)(req, res);
  Users.get(id).then(function (user) {
    res.status(200).send(user);
  });
});

router.post("/", function (req, res) {
  firebase.create(req.body).then(function (data) {
    res.status(200).send(data);
  });
});

module.exports = router;