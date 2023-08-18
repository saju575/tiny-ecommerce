const express = require("express");
const {
  processRegistration,
  verifyRegistration,
} = require("../controllers/user/user.controller");

/* 
    create a new user router
*/
const userRouter = express.Router();

/* 
    process the user registration
    process-registration endpoint
*/
userRouter.post("/process-registration", processRegistration);

/* 
    verify the registration
    verify-registration endpoint
*/
userRouter.post("/verify-registration", verifyRegistration);

module.exports = userRouter;
