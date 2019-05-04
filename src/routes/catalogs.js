import express from "express";
import * as Catalogs from "../services/catalogs";
import { tokenId } from "../utils";

const router = express.Router();

function canUpdate(req, res, next) {
  const { owner } = req.body;
  if (owner == tokenId(req, res)) {
    next();
  } else {
    res.status(400).send({ status: 400, error: ["Unauthorized"] });
  }
}
function canDelete(req, res, next) {
  const { id } = req.params;
  Catalogs.find(id)
    .then(data => {
      if (data.owner == tokenId(req, res)) {
        next();
      } else {
        res.status(400).send({ status: 400, error: ["Unauthorized"] });
      }
    })
    .catch(error => {
      res.status(error.status).send(error);
    });
}

router.get("/", function(req, res) {
  Catalogs.findAll(tokenId(req, res)).then(data => res.status(200).send(data));
});

router.get("/:id", function(req, res) {
  const { id } = req.params;
  Catalogs.find(id)
    .then(data => res.status(200).send(data))
    .catch(error => {
      res.status(error.status).send(error);
    });
});

router.post("/", function(req, res) {
  var catalog = { ...req.body, owner: tokenId(req, res) };
  Catalogs.create(catalog)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => res.status(error.status).send(error));
});

router.put("/", canUpdate, function(req, res) {
  Catalogs.update(req.body)
    .then(data => res.status(200).send(data))
    .catch(error => {
      res.status(error.status).send({ error });
    });
});

router.delete("/:id", canDelete, function(req, res) {
  const { id } = req.params;
  Catalogs.remove(id)
    .then(data => res.status(200).send(data))
    .catch(error => res.status(error.status).send(error));
});

module.exports = router;
