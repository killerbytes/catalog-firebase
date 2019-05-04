"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductSchema = exports.CatalogSchema = undefined;

var _yup = require("yup");

var yup = _interopRequireWildcard(_yup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var CatalogSchema = exports.CatalogSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  owner: yup.string().required()
});

var ProductSchema = exports.ProductSchema = yup.object().shape({
  name: yup.string().required()
  // price: yup.integer().required(),
  // srp: yup.integer().required()
});