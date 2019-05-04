import Database from "./firestore";
import { CatalogSchema } from "../schema";

var Collection = Database.collection("Catalogs");

export const create = data => {
  return new Promise((resolve, reject) => {
    CatalogSchema.validate(data, { abortEarly: false })
      .then(() => {
        Collection.add(data).then(res => {
          find(res.id).then(doc => {
            resolve({ ...doc, id: doc.id });
          });
        });
      })
      .catch(err => reject({ status: 400, errors: err.errors }));
  });
};

export const update = data => {
  return new Promise((resolve, reject) => {
    find(data.id)
      .then(() => {
        Collection.doc(data.id)
          .set(data, { merge: true })
          .then(() => {
            find(data.id)
              .then(doc => {
                resolve({ ...doc, id: doc.id });
              })
              .catch(err => reject(err));
          });
      })
      .catch(error => reject(error));
  });
};

export const remove = id => {
  return Collection.doc(id).delete();
};

export const find = id => {
  const ref = Collection.doc(id);
  return new Promise((resolve, reject) => {
    ref
      .get()
      .then(data => {
        if (data.exists) {
          resolve({ ...data.data(), id: data.id });
        } else {
          reject({ status: 404, errors: ["Catalog does not exists"] });
        }
      })
      .catch(err => reject(err));
  });
};

export const findAll = owner => {
  const ref = Collection.where("owner", "==", owner);
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
