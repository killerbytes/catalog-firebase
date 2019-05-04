import * as yup from "yup";

export const CatalogSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  owner: yup.string().required()
});

export const ProductSchema = yup.object().shape({
  name: yup.string().required()
  // price: yup.integer().required(),
  // srp: yup.integer().required()
});
