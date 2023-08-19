const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { JWT_ACCESS_KEY } = require("../secret");
/* 
    check user login
*/
exports.isLogin = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw createHttpError(404, "Access token not found. Please login");
    }

    //verify that user is valid or not
    const decoded = await jwt.verify(accessToken, JWT_ACCESS_KEY);
    if (!decoded) {
      throw createHttpError(401, "Invalid access token");
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

/* 
    check user isLogout
*/
exports.isLogOut = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      throw createHttpError(400, "User already logged in");
    }

    next();
  } catch (error) {
    next(error);
  }
};

/* 
    isAdmin or not
*/
exports.isAdmin = async (req, res, next) => {
  try {
    //check admin permissions
    if (!req.user.isAdmin) {
      throw createHttpError(400, "You are not a admin");
    }

    next();
  } catch (error) {
    next(error);
  }
};
