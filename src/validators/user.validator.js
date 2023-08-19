const createHttpError = require("http-errors");
const Joi = require("joi");
const {
  errorResponse,
} = require("../controllers/response/response.controller");

/* 
    Define the validation schema with custom error messages
*/
const registrationSchema = Joi.object({
  name: Joi.string().alphanum().min(4).max(32).required().messages({
    "string.empty": "Username is required",
    "string.alphanum": "Username should only contain letters and numbers",
    "string.min": "Username must be at least 4 characters long",
    "string.max": "Username can be at most 32 characters long",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
  }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be must be at least 6 characters long",
  }),
  //   gender:Joi.string().valid("Male","Female","Others").message({
  //     "any.only":"Gender must be one of 'male','female','others'"
  //   }),
  //   address:Joi.string(),
  //   phone:Joi.string(),
  //   isAdmin:
});

/* 
    user Login schema
*/
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
  }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be must be at least 6 characters long",
  }),
});

/* 
    Middleware function for user registration validation
*/
exports.validateRegistration = (req, res, next) => {
  //validate schema
  try {
    const { error } = registrationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return errorResponse(res, {
        statusCode: 422,
        message: error.details[0].message,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

/* 
    Middleware functions for user logging 
*/
exports.validateLoggedIn = (req, res, next) => {
  try {
    //validate logged schema
    const { error } = loginSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return errorResponse(res, {
        statusCode: 422,
        message: error.details[0].message,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
