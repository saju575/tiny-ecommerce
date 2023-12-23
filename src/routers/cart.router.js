const express = require("express");
const { isLogin } = require("../middlewares/auth.middleware");
const {
  handleAddtoCartNewItem,
} = require("../controllers/cart/cart.controller");

const cartRouter = express.Router();

/* 
    process the user registration
    process-registration endpoint
*/
cartRouter.post(
  "/set-cart",
  isLogin,

  handleAddtoCartNewItem
);

module.exports = cartRouter;
