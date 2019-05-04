import Database from "./firestore";

var Collection = Database.collection("Users");

export const create = data => {
  return Collection.add(data).then(res => {
    return get(res.id).then(doc => {
      return doc;
    });
  });
};

export const get = id => {
  const ref = Collection.doc(id);
  return new Promise((resolve, reject) => {
    ref
      .get()
      .then(res => resolve(res.data()))
      .catch(err => reject(err));
  });
};

export const findOrCreate = profile => {
  return get(profile.id).then(doc => {
    if (doc && doc.exists) {
      return doc;
    } else {
      return Collection.doc(profile.id)
        .set(profile)
        .then(res => {
          return get(profile.id);
        });
    }
  });
};
