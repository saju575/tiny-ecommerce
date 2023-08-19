const express = require("express");
const {
  processRegistration,
  verifyRegistration,
  getUser,
} = require("../controllers/user/user.controller");
const { isLogOut, isLogin } = require("../middlewares/auth.middleware");
const { validateRegistration } = require("../validators/user.validator");

/* 
    create a new user router
*/
const userRouter = express.Router();

/* 
    process the user registration
    process-registration endpoint
*/
userRouter.post(
  "/process-registration",
  isLogOut,
  validateRegistration,
  processRegistration
);

/* 
    verify the registration
    verify-registration endpoint
*/
userRouter.post("/verify-registration", isLogOut, verifyRegistration);

/* 
    get a user info endpoint
*/
userRouter.get("/:id", isLogin, getUser);

module.exports = userRouter;
