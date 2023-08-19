const express = require("express");
const {
  handleLogin,
  handleLogOut,
} = require("../controllers/auth/auth.controller");
const { isLogOut, isLogin } = require("../middlewares/auth.middleware");

/* 
    auth router
*/
const authRouter = express.Router();

/* 
    login router
*/
authRouter.post("/login", isLogOut, handleLogin);

/* 
    logout router
*/
authRouter.post("/logout", isLogin, handleLogOut);

module.exports = authRouter;
