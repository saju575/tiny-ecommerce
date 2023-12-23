const express = require("express");
const {
  processRegistration,

  getUser,
  activateAccount,
} = require("../controllers/user/user.controller");
const { isLogOut, isLogin } = require("../middlewares/auth.middleware");

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

  processRegistration
);

/* 
    verify the registration
    verify-registration endpoint
*/
userRouter.get("/activate-user/:id/:token", isLogOut, activateAccount);

/* 
    get a user info endpoint
*/
userRouter.get("/profile", isLogin, getUser);

module.exports = userRouter;
