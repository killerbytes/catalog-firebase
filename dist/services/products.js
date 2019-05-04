"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find = exports.findAll = exports.remove = exports.update = exports.create = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _firestore = require("./firestore");

var _firestore2 = _interopRequireDefault(_firestore);

var _schema = require("../schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Collection = _firestore2.default.collection("Catalogs");

var create = exports.create = function create(catalog_id, data) {
  return new Promise(function (resolve, reject) {
    _schema.ProductSchema.validate(data, { abortEarly: false }).then(function () {
      Collection.doc(catalog_id).collection("products").add(data).then(function (res) {
        find(catalog_id, res.id).then(function (doc) {
          resolve(doc);
        });
      });
    }).catch(function (err) {
      return reject({ status: 400, errors: err.errors });
    });
  });
};

var update = exports.update = function update(catalog_id, data) {
  return new Promise(function (resolve, reject) {
    find(catalog_id, data.id).then(function () {
      Collection.doc(catalog_id).collection("products").doc(data.id).set(data, { merge: true }).then(function () {
        find(catalog_id, data.id).then(function (product) {
          resolve(product);
        });
      }).catch(function (err) {
        return reject(err);
      });
    }).catch(function (err) {
      return reject(err);
    });
  });
};

var remove = exports.remove = function remove(catalog_id, id) {
  return Collection.doc(catalog_id).collection("products").doc(id).delete();
};

var findAll = exports.findAll = function findAll(catalog_id) {
  var ref = Collection.doc(catalog_id).collection("products");
  return new Promise(function (resolve, reject) {
    ref.get().then(function (snapshot) {
      var data = [];
      snapshot.forEach(function (doc) {
        data.push((0, _extends3.default)({}, doc.data(), { id: doc.id }));
      });
      resolve(data);
    }).catch(function (err) {
      return reject(err);
    });
  });
};

var find = exports.find = function find(catalog_id, id) {
  var ref = Collection.doc(catalog_id).collection("products").doc(id);
  return new Promise(function (resolve, reject) {
    ref.get().then(function (product) {
      if (product.exists) {
        resolve((0, _extends3.default)({}, product.data(), { id: product.id }));
      } else {
        reject({ status: 404, message: "Product does not exists" });
      }
    }).catch(function (err) {
      return reject(err);
    });
  });
};