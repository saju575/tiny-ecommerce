const express = require("express");
const { handleLogin } = require("../controllers/auth/auth.controller");

/* 
    auth router
*/
const authRouter = express.Router();

/* 
    login router
*/
authRouter.post("/login", handleLogin);

module.exports = authRouter;
