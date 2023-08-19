const express = require("express");
const {
  handleLogin,
  handleLogOut,
} = require("../controllers/auth/auth.controller");

/* 
    auth router
*/
const authRouter = express.Router();

/* 
    login router
*/
authRouter.post("/login", handleLogin);

/* 
    logout router
*/
authRouter.post("/logout", handleLogOut);

module.exports = authRouter;
