"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAll = exports.find = exports.remove = exports.update = exports.create = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _firestore = require("./firestore");

var _firestore2 = _interopRequireDefault(_firestore);

var _schema = require("../schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Collection = _firestore2.default.collection("Catalogs");

var create = exports.create = function create(data) {
  return new Promise(function (resolve, reject) {
    _schema.CatalogSchema.validate(data, { abortEarly: false }).then(function () {
      Collection.add(data).then(function (res) {
        find(res.id).then(function (doc) {
          resolve((0, _extends3.default)({}, doc, { id: doc.id }));
        });
      });
    }).catch(function (err) {
      return reject({ status: 400, errors: err.errors });
    });
  });
};

var update = exports.update = function update(data) {
  return new Promise(function (resolve, reject) {
    find(data.id).then(function () {
      Collection.doc(data.id).set(data, { merge: true }).then(function () {
        find(data.id).then(function (doc) {
          resolve((0, _extends3.default)({}, doc, { id: doc.id }));
        }).catch(function (err) {
          return reject(err);
        });
      });
    }).catch(function (error) {
      return reject(error);
    });
  });
};

var remove = exports.remove = function remove(id) {
  return Collection.doc(id).delete();
};

var find = exports.find = function find(id) {
  var ref = Collection.doc(id);
  return new Promise(function (resolve, reject) {
    ref.get().then(function (data) {
      if (data.exists) {
        resolve((0, _extends3.default)({}, data.data(), { id: data.id }));
      } else {
        reject({ status: 404, errors: ["Catalog does not exists"] });
      }
    }).catch(function (err) {
      return reject(err);
    });
  });
};

var findAll = exports.findAll = function findAll(owner) {
  var ref = Collection.where("owner", "==", owner);
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