"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenId = undefined;
exports.canUpdateCatalog = canUpdateCatalog;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tokenId = exports.tokenId = function tokenId(req, res) {
  var token = req.headers["x-access-token"];

  return _jsonwebtoken2.default.verify(token, "azidburn!@#123", function (err, decoded) {
    if (err) {
      res.status(401).send(err);
    } else {
      return decoded.id;
    }
  });
};

function canUpdateCatalog(req, res, next) {
  var id = req.params.id;
  var owner = req.body.owner;

  if (id) {} else if (owner === tokenId(req, res)) {
    return next();
  } else {
    var error = { status: 400, error: ["Unauthorized"] };
    res.status(error.status).send(error);
  }
}