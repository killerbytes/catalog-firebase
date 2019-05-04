import express from "express";
import * as Users from "../services/users";
import { tokenId } from "../utils";

const router = express.Router();

router.get("/", function(req, res) {
  const id = tokenId(req, res);
  Users.get(id).then(user => {
    res.status(200).send(user);
  });
});

router.post("/", function(req, res) {
  firebase.create(req.body).then(data => {
    res.status(200).send(data);
  });
});

module.exports = router;
