const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../../models/user.model");
const { createJWTToken } = require("../../helper/jwt.helper");
const { JWT_ACTIVATION_KEY, CLIENT_URL } = require("../../secret");
const { successResponse } = require("../response/response.controller");
const { sendEmailWithNodemailer } = require("../../helper/emailSend.helper");
const { findWithId } = require("../../services/findItem.service");
const Token = require("../../models/token.model");

/* 
  registration process controller
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
      "1d"
    );

    // Save the token to the database
    const token = await new Token({
      token: crypto.randomBytes(32).toString("hex"),
      jwtToken,
    }).save();

    //prepare email data
    const emailData = {
      email,
      subject: "Account activation mail",
      html: `
        <h2>Hello ${name}.</h2>
        <p>Is it you?</p>
        <p>Please click here to <a href="${CLIENT_URL}/account-verify/${token._id}/${token.token}">activate you account</a></p>
        `,
    };

    //send email with nodemail
    try {
      await sendEmailWithNodemailer(emailData);
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

/**
 * Activates a user account.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the token.
 * @param {string} req.params.token - The token.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.activateAccount = async (req, res, next) => {
  try {
    // Find the token in the database
    const token = await Token.findOne({
      _id: req.params.id,
      token: req.params.token,
    });

    // If token is not found, throw an error
    if (!token) {
      throw createHttpError(404, "Invalid Link");
    }

    // Verify the JWT token
    const decodedInfo = jwt.verify(token.jwtToken, JWT_ACTIVATION_KEY);

    // If token is invalid, throw an error
    if (!decodedInfo) {
      throw createHttpError(404, "Invalid Link");
    }

    // Check if the user email already exists
    const isEmailExist = await User.exists({ email: decodedInfo.email });

    // If email already exists, throw an error
    if (isEmailExist) {
      throw createHttpError(404, "Invalid Link");
    }

    // Create a new user with the decoded information
    await User.create(decodedInfo);

    // Delete the token from the database
    await Token.findByIdAndDelete(token._id);

    // Return a success response
    return successResponse(res, {
      statusCode: 201,

      message: `Email verified successfully`,
    });
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};

/* 
  get a user information
*/
exports.getUser = async (req, res, next) => {
  try {
    // get the id
    const userId = req.user._id;

    //option
    const options = {
      password: 0,
    };

    //get user
    const user = await await User.findById(userId, options)
      .populate("cart.productId", "title imageUrl") // Populate the 'productId' field from the 'Product' model, including only 'name' and 'image' fields
      .exec();

    // return success response
    return successResponse(res, {
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};
