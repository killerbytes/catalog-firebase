import express from "express";
import * as Products from "../services/products";
import * as Catalogs from "../services/catalogs";
import { tokenId } from "../utils";

const router = express.Router();

function canUpdate(req, res, next) {
  const { catalog } = req.query;
  Catalogs.find(catalog)
    .then(data => {
      if (data.owner === tokenId(req, res)) {
        next();
      } else {
        res.status(400).send({ status: 400, error: ["Unauthorized"] });
      }
    })
    .catch(error => res.status(error.status).send(error));
}

router.get("/", function(req, res) {
  const { catalog } = req.query;
  Products.findAll(catalog).then(data => res.status(200).send(data));
});

router.get("/:id", function(req, res) {
  const { id } = req.params;
  const { catalog } = req.query;
  Products.find(catalog, id)
    .then(data => res.status(200).send(data))
    .catch(error => res.status(error.status).send(error));
});

router.post("/", canUpdate, function(req, res) {
  const { catalog } = req.query;
  Products.create(catalog, req.body)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => res.status(error.status).send(error));
});

router.put("/", canUpdate, function(req, res) {
  const { catalog } = req.query;
  Products.update(catalog, req.body)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => res.status(error.status).send(error));
});

router.delete("/:id", canUpdate, function(req, res) {
  const { catalog } = req.query;
  const { id } = req.params;
  Products.remove(catalog, id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => res.status(error.status).send(error));
});

module.exports = router;
