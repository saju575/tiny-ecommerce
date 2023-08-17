const app = require("./app");
const { SERVER_PORT } = require("./secret");

/* 
    listen on port number
*/

app.listen(SERVER_PORT, async () => {
  console.log(`listening on port ${SERVER_PORT}`);
});
