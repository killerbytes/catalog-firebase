import Database from "./firestore";
import { ProductSchema } from "../schema";

var Collection = Database.collection("Catalogs");

export const create = (catalog_id, data) => {
  return new Promise((resolve, reject) => {
    ProductSchema.validate(data, { abortEarly: false })
      .then(() => {
        Collection.doc(catalog_id)
          .collection("products")
          .add(data)
          .then(res => {
            find(catalog_id, res.id).then(doc => {
              resolve(doc);
            });
          });
      })
      .catch(err => reject({ status: 400, errors: err.errors }));
  });
};

export const update = (catalog_id, data) => {
  return new Promise((resolve, reject) => {
    find(catalog_id, data.id)
      .then(() => {
        Collection.doc(catalog_id)
          .collection("products")
          .doc(data.id)
          .set(data, { merge: true })
          .then(() => {
            find(catalog_id, data.id).then(product => {
              resolve(product);
            });
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
};

export const remove = (catalog_id, id) => {
  return Collection.doc(catalog_id)
    .collection("products")
    .doc(id)
    .delete();
};

export const findAll = catalog_id => {
  const ref = Collection.doc(catalog_id).collection("products");
  return new Promise((resolve, reject) => {
    ref
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(doc => {
          data.push({ ...doc.data(), id: doc.id });
        });
        resolve(data);
      })
      .catch(err => reject(err));
  });
};

export const find = (catalog_id, id) => {
  const ref = Collection.doc(catalog_id)
    .collection("products")
    .doc(id);
  return new Promise((resolve, reject) => {
    ref
      .get()
      .then(product => {
        if (product.exists) {
          resolve({ ...product.data(), id: product.id });
        } else {
          reject({ status: 404, message: "Product does not exists" });
        }
      })
      .catch(err => reject(err));
  });
};
