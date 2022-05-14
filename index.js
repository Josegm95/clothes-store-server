var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
var cors = require("cors");

var app = express();

const products = [
  { id: 12, name: "producto1", price: 110000 },
  { id: 13, name: "producto2", price: 120000 },
  { id: 23, name: "producto3", price: 130000 },
];

var schema = buildSchema(`
  type product {
      id: Int
      name: String
      price: Int
  }

  input productInput {
    id: Int
      name: String
      price: Int
  } 

  type Query {
    product(id: Int!): product
    products: [product]
    hello: String
  }

  type Mutation {
      addProduct(product: productInput): String
  }
`);

var root = {
  hello: () => "Hello world!",

  product: ({ id }) => {
    return products.find((product) => product.id === id);
  },

  products: () => products,

  addProduct: ({ product }) => {
    products.push(product);
    return "funciono";
  },
};

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
