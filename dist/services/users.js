"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findOrCreate = exports.get = exports.create = undefined;

var _firestore = require("./firestore");

var _firestore2 = _interopRequireDefault(_firestore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Collection = _firestore2.default.collection("Users");

var create = exports.create = function create(data) {
  return Collection.add(data).then(function (res) {
    return get(res.id).then(function (doc) {
      return doc;
    });
  });
};

var get = exports.get = function get(id) {
  var ref = Collection.doc(id);
  return new Promise(function (resolve, reject) {
    ref.get().then(function (res) {
      return resolve(res.data());
    }).catch(function (err) {
      return reject(err);
    });
  });
};

var findOrCreate = exports.findOrCreate = function findOrCreate(profile) {
  return get(profile.id).then(function (doc) {
    if (doc && doc.exists) {
      return doc;
    } else {
      return Collection.doc(profile.id).set(profile).then(function (res) {
        return get(profile.id);
      });
    }
  });
};