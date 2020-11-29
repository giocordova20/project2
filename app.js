/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const express = require('express'); // Express web server framework
const cors = require('cors');
const cookieParser = require('cookie-parser');


/*
To get the application to work switch the name of login.html to index.html
No matter what I do it only opens index.html
*/

const app = express();

app.use(express.static('public'))
   .use(cors())
   .use(cookieParser());

require("./routes/login_routes.js")(app);
console.log('Listening on 8888');
app.listen(8888);
