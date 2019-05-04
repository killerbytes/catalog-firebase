import jwt from "jsonwebtoken";

export const tokenId = (req, res) => {
  const token = req.headers["x-access-token"];

  return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).send(err);
    } else {
      return decoded.id;
    }
  });
};

export function canUpdateCatalog(req, res, next) {
  const { id } = req.params;
  const { owner } = req.body;
  if (id) {
  } else if (owner === tokenId(req, res)) {
    return next();
  } else {
    const error = { status: 400, error: ["Unauthorized"] };
    res.status(error.status).send(error);
  }
}
