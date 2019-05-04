"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _auth = require("./routes/auth");

var _auth2 = _interopRequireDefault(_auth);

var _users = require("./routes/users");

var _users2 = _interopRequireDefault(_users);

var _catalogs = require("./routes/catalogs");

var _catalogs2 = _interopRequireDefault(_catalogs);

var _products = require("./routes/products");

var _products2 = _interopRequireDefault(_products);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
_passport2.default.serializeUser(function (user, done) {
  done(null, user);
});
_passport2.default.deserializeUser(function (user, done) {
  done(null, user);
});

app.set("port", undefined || 9000);

app.use((0, _cors2.default)());
app.use((0, _cookieParser2.default)());
app.use(_bodyParser2.default.json());
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));
app.use(require("express-session")({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true
}));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

app.use("/api/products", _products2.default);
app.use("/api/catalogs", _catalogs2.default);
app.use("/api/users", _users2.default);
app.use("/auth", _auth2.default);
app.get("/", function (req, res, next) {
  res.send({ auth: req.user });
});

app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});