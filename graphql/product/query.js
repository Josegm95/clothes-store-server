export const ProductQuery = {
  product: ({ id }) => {
    return products.find((product) => product.id === id);
  },
  products: () => products,
};
