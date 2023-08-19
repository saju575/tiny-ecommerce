const createHttpError = require("http-errors");
const bcrypt = require("bcryptjs");

const User = require("../../models/user.model");
const { createJWTToken } = require("../../helper/jwt.helper");
const { JWT_ACCESS_KEY } = require("../../secret");
const { successResponse } = require("../response/response.controller");

/* 
    user login
*/
exports.handleLogin = async (req, res, next) => {
  try {
    // get data
    const { email: reqEmail, password: reqPass } = req.body;

    //is user exists
    const user = await User.findOne({ email: reqEmail });

    if (!user) {
      throw createHttpError(404, "User not found.Please register first");
    }

    //compare password
    const isPasswordMatch = await bcrypt.compare(reqPass, user.password);

    if (!isPasswordMatch) {
      throw createHttpError(401, "User/Password mismatch");
    }

    // is Banned or not
    if (user.isBanned) {
      throw createHttpError(
        403,
        "You are banned. Please contact to the authorities"
      );
    }

    //get name, email, isAdmin and isVarified
    const { name, email: userEmail, isAdmin, isVarified } = user._doc;

    //create a jwt token
    const accessToken = createJWTToken(
      { name, email: userEmail, isAdmin, isVarified },
      JWT_ACCESS_KEY,
      "10d"
    );

    // set cookies
    res.cookie("accessToken", accessToken, {
      maxAge: 60 * 60 * 24 * 10 * 1000,
      httpOnly: true,
      sameSite: "none",
    });

    //get user without password
    const { password: userPass, ...otherUserInfo } = user._doc;

    //return successFull respose
    return successResponse(res, {
      message: "User login successful",
      payload: { ...otherUserInfo },
    });
  } catch (error) {
    next(error);
  }
};
/* 
   User logout
*/
exports.handleLogOut = (req, res, next) => {
  try {
    //clear cookies
    res.clearCookie("accessToken");

    //successFullResponse
    return successResponse(res, {
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
