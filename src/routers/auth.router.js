const express = require("express");
const {
  handleLogin,
  handleLogOut,
} = require("../controllers/auth/auth.controller");
const { isLogOut, isLogin } = require("../middlewares/auth.middleware");
const { validateLoggedIn } = require("../validators/user.validator");

/* 
    auth router
*/
const authRouter = express.Router();

/* 
    login router
*/
authRouter.post("/login", isLogOut, validateLoggedIn, handleLogin);

/* 
    logout router
*/
authRouter.post("/logout", isLogin, handleLogOut);

module.exports = authRouter;
