const createHttpError = require("http-errors");
const User = require("../../models/user.model");
const { createJWTToken } = require("../../helper/jwt.helper");
const { JWT_ACTIVATION_KEY } = require("../../secret");
const { successResponse } = require("../response/response.controller");

/* 
    process-registration controller
*/
exports.processRegistration = async (req, res, next) => {
  try {
    // destructure the registration data
    const { name, email, password } = req.body;

    //check user already registered or not
    const isRegistered = await User.exists({ email });
    if (isRegistered) {
      throw createHttpError(409, "User with this email already registered");
    }

    // create jwt token
    const jwtToken = createJWTToken(
      { name, email, password },
      JWT_ACTIVATION_KEY,
      "10m"
    );

    //return success response
    return successResponse(res, {
      message: `Please go to your ${email} for completing signUp process`,
      payload: jwtToken,
    });
  } catch (error) {
    next(error);
  }
};
