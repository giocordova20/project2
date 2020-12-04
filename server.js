// server.js
// where your node app starts

// init project
const express = require('express'); // Express web server framework
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

var PORT = process.env.PORT || 8888;
app.use(express.static('public'))
   .use(cors())
   .use(cookieParser());

require("./routes/login_routes.js")(app);
require("./routes/playlist-api-routes")(app);
require("./routes/playlist_contents-api-routes.js")(app);
require("./routes/spotify_api")(app);


// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("\nApp listening on http://localhost:" + PORT);
  });
});


// // listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });
