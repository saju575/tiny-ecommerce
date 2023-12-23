const express = require("express");
const {
  getAllProducts,
  addNewProduct,
} = require("../controllers/product/product.controller");

const productRouter = express.Router();

productRouter.get("/", getAllProducts);

productRouter.post("/create", addNewProduct);
module.exports = productRouter;
