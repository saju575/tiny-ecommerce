const express = require("express");

/* 
    create a new user router
*/
const userRouter = express.Router();

/* 
    process the user registration
    process-registration endpoint
*/
userRouter.use("/process-registration");

/* 
    verify the registration
    verify-registration endpoint
*/
userRouter.use("/verify-registration");

module.exports = userRouter;
