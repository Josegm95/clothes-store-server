export const ProductMutation = {
  addProduct: ({ product }) => {
    products.push(product);
    return "funciono";
  },
};
