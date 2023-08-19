const express = require("express");
const createHttpError = require("http-errors");
const xssClean = require("xss-clean");
const cookies = require("cookie-parser");
const cors = require("cors");

const { errorResponse } = require("./controllers/response/response.controller");
const userRouter = require("./routers/user.router");
const authRouter = require("./routers/auth.router");

/* 
    making app
*/
const app = express();

/* 
    middlewares
*/
app.use(cors());
app.use(xssClean());
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* 
  end point using
*/

/* 
  user signup endpoint
*/
app.use("/api/users", userRouter);

/* 
  user login endpoint
*/
app.use("/api/user/auth", authRouter);

/*
    Client error handler
 */
app.use((req, res, next) => {
  next(createHttpError(404, "Route Not Found"));
});

/*
    Server error handler
    -> all the error comes here
*/
app.use((err, req, res, next) => {
  return errorResponse(res, { statusCode: err.status, message: err.message });
});

module.exports = app;
