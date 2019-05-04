import "dotenv/config";

import express from "express";
import cors from "cors";
import passport from "passport";

import auth from "./routes/auth";
import users from "./routes/users";
import catalogs from "./routes/catalogs";
import products from "./routes/products";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.set("port", process.env.PORT || 9000);

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", products);
app.use("/api/catalogs", catalogs);
app.use("/api/users", users);
app.use("/auth", auth);
app.get("/", function(req, res, next) {
  res.send({ auth: req.user });
});

app.listen(app.get("port"), () => {
  console.log(`Server started on port ${app.get("port")}`);
});
