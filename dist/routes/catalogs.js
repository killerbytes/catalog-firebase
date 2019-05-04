"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _catalogs = require("../services/catalogs");

var Catalogs = _interopRequireWildcard(_catalogs);

var _utils = require("../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

function canUpdate(req, res, next) {
  var owner = req.body.owner;

  if (owner == (0, _utils.tokenId)(req, res)) {
    next();
  } else {
    res.status(400).send({ status: 400, error: ["Unauthorized"] });
  }
}
function canDelete(req, res, next) {
  var id = req.params.id;

  Catalogs.find(id).then(function (data) {
    if (data.owner == (0, _utils.tokenId)(req, res)) {
      next();
    } else {
      res.status(400).send({ status: 400, error: ["Unauthorized"] });
    }
  }).catch(function (error) {
    res.status(error.status).send(error);
  });
}

router.get("/", function (req, res) {
  Catalogs.findAll((0, _utils.tokenId)(req, res)).then(function (data) {
    return res.status(200).send(data);
  });
});

router.get("/:id", function (req, res) {
  var id = req.params.id;

  Catalogs.find(id).then(function (data) {
    return res.status(200).send(data);
  }).catch(function (error) {
    res.status(error.status).send(error);
  });
});

router.post("/", function (req, res) {
  var catalog = (0, _extends3.default)({}, req.body, { owner: (0, _utils.tokenId)(req, res) });
  Catalogs.create(catalog).then(function (data) {
    res.status(200).send(data);
  }).catch(function (error) {
    return res.status(error.status).send(error);
  });
});

router.put("/", canUpdate, function (req, res) {
  Catalogs.update(req.body).then(function (data) {
    return res.status(200).send(data);
  }).catch(function (error) {
    res.status(error.status).send({ error: error });
  });
});

router.delete("/:id", canDelete, function (req, res) {
  var id = req.params.id;

  Catalogs.remove(id).then(function (data) {
    return res.status(200).send(data);
  }).catch(function (error) {
    return res.status(error.status).send(error);
  });
});

module.exports = router;