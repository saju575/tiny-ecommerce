const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../../models/user.model");
const { createJWTToken } = require("../../helper/jwt.helper");
const { JWT_ACTIVATION_KEY, CLIENT_URL } = require("../../secret");
const { successResponse } = require("../response/response.controller");
const { sendEmailWithNodemailer } = require("../../helper/emailSend.helper");

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

    //prepare email data
    const emailData = {
      email,
      subject: "Account activation mail",
      html: `
        <h2>Hello ${name}.</h2>
        <p>Is it you?</p>
        <p>Please click here to <a href="${CLIENT_URL}/verify-email/${jwtToken}">activate you account</a></p>
        `,
    };

    //send email with nodemail
    try {
      //await sendEmailWithNodemailer(emailData);
    } catch (error) {
      createHttpError(500, "Failed to send varification email");
      return;
    }

    //return success response
    return successResponse(res, {
      message: `Please go to your ${email} for completing signUp process`,
      payload: jwtToken,
    });
  } catch (error) {
    next(error);
  }
};

/* 
  verify registration controller
*/
exports.verifyRegistration = async (req, res, next) => {
  try {
    // get the token
    const token = req.body.token;

    //token is not provided
    if (!token) {
      throw createHttpError(404, "Token missing");
    }

    try {
      //decode the token
      const decodedToken = jwt.verify(token, JWT_ACTIVATION_KEY);

      if (!decodedToken) throw createHttpError(401, "User is not verified");

      // check user already exists
      const userExists = await User.exists({ email: decodedToken.email });

      if (userExists) {
        throw createHttpError(
          409,
          "User with this email already exists. Please sign in."
        );
      }

      // create new user and add to the DB
      await User.create({ ...decodedToken, isVarified: true });

      //return successful response
      return successResponse(res, {
        message: "User was  registered successfully",
        statusCode: 201,
      });
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw createHttpError(401, "Token has expired");
      } else if (err.name === "JsonWebTokenError") {
        throw createHttpError(401, "Invalid Token");
      } else {
        throw err;
      }
    }
  } catch (error) {
    next(error);
  }
};
