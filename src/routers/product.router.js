const express = require("express");
const {
  getAllProducts,
  addNewProduct,
  getSingleProducts,
} = require("../controllers/product/product.controller");

const productRouter = express.Router();

productRouter.get("/", getAllProducts);

productRouter.get("/:id", getSingleProducts);

productRouter.post("/create", addNewProduct);
module.exports = productRouter;
