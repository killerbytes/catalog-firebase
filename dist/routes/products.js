"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _products = require("../services/products");

var Products = _interopRequireWildcard(_products);

var _catalogs = require("../services/catalogs");

var Catalogs = _interopRequireWildcard(_catalogs);

var _utils = require("../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

function canUpdate(req, res, next) {
  var catalog = req.query.catalog;

  Catalogs.find(catalog).then(function (data) {
    if (data.owner === (0, _utils.tokenId)(req, res)) {
      next();
    } else {
      res.status(400).send({ status: 400, error: ["Unauthorized"] });
    }
  }).catch(function (error) {
    return res.status(error.status).send(error);
  });
}

router.get("/", function (req, res) {
  var catalog = req.query.catalog;

  Products.findAll(catalog).then(function (data) {
    return res.status(200).send(data);
  });
});

router.get("/:id", function (req, res) {
  var id = req.params.id;
  var catalog = req.query.catalog;

  Products.find(catalog, id).then(function (data) {
    return res.status(200).send(data);
  }).catch(function (error) {
    return res.status(error.status).send(error);
  });
});

router.post("/", canUpdate, function (req, res) {
  var catalog = req.query.catalog;

  Products.create(catalog, req.body).then(function (data) {
    res.status(200).send(data);
  }).catch(function (error) {
    return res.status(error.status).send(error);
  });
});

router.put("/", canUpdate, function (req, res) {
  var catalog = req.query.catalog;

  Products.update(catalog, req.body).then(function (data) {
    res.status(200).send(data);
  }).catch(function (error) {
    return res.status(error.status).send(error);
  });
});

router.delete("/:id", canUpdate, function (req, res) {
  var catalog = req.query.catalog;
  var id = req.params.id;

  Products.remove(catalog, id).then(function (data) {
    res.status(200).send(data);
  }).catch(function (error) {
    return res.status(error.status).send(error);
  });
});

module.exports = router;