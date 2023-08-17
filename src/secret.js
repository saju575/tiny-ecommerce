require("dotenv").config();
/* 
    server port number
*/
exports.SERVER_PORT = process.env.SERVER_PORT;

/*
    mongodb url
 */
exports.MONGODB_URL = process.env.MONGODB_URL;

/* 
    jwt activation key for signup
*/
exports.JWT_ACTIVATION_KEY = process.env.JWT_ACTIVATION_KEY;
