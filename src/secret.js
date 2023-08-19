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

/* 
    jwt access key
*/
exports.JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;

/* 
    mail send username and password
*/
exports.SMTP_USER_NAME = process.env.SMTP_EMAIL;
exports.SMTP_PASSWORD = process.env.SMTP_EMAIL_PASS;

/* 
    client url
*/
exports.CLIENT_URL = process.env.CLIENT_URL;
