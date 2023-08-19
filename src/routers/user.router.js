const express = require("express");
const {
  processRegistration,
  verifyRegistration,
} = require("../controllers/user/user.controller");
const { isLogOut } = require("../middlewares/auth.middleware");

/* 
    create a new user router
*/
const userRouter = express.Router();

/* 
    process the user registration
    process-registration endpoint
*/
userRouter.post("/process-registration", isLogOut, processRegistration);

/* 
    verify the registration
    verify-registration endpoint
*/
userRouter.post("/verify-registration", isLogOut, verifyRegistration);

module.exports = userRouter;
