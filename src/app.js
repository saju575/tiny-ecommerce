const express = require("express");
const createHttpError = require("http-errors");
const xssClean = require("xss-clean");
const {
  errorResponse,
} = require("./controllers/response/response/response.controller");

/* 
    making app
*/
const app = express();

/* 
    middlewares
*/

app.use(xssClean());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
