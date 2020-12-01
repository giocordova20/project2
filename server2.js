// server.js
// where your node app starts

// init project
// var qs = require('querystring');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8888;


// Requiring our models for syncing
var db = require("./models");
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// // init Spotify API wrapper
// var SpotifyWebApi = require('spotify-web-api-node');

// var spotifyApi = new SpotifyWebApi({
//   clientId : '7d508c40819643bd9043057da1035acc',
//   clientSecret : '3438a5114e1b468ba7a8ace70662d829',
// });

// const jssdkscopes = ["streaming", "user-read-birthdate", "user-read-email", "user-read-private", "user-modify-playback-state"];
// const redirectUriParameters = {
//   client_id: '7d508c40819643bd9043057da1035acc',
//   response_type: 'token',
//   scope: jssdkscopes.join(' '),
//   redirect_uri: encodeURI('http://localhost:8888/callback'),
//   show_dialog: true,
// }

// const redirectUri = `https://accounts.spotify.com/authorize?${qs.stringify(redirectUriParameters)}`;

// function authenticate(callback) {
//   spotifyApi.clientCredentialsGrant()
//     .then(function(data) {
//       console.log('The access token expires in ' + data.body['expires_in']);
//       console.log('The access token is ' + data.body['access_token']);
    
//       callback instanceof Function && callback();

//       // Save the access token so that it's used in future calls
//       spotifyApi.setAccessToken(data.body['access_token']);
//     }, function(err) {
//       console.log('Something went wrong when retrieving an access token', err.message);
//     });
// }
// authenticate();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


require("./routes/spotify_api")(app);


// app.get("/search", function (request, response) {
//   reAuthenticateOnFailure((failure) => {
//     spotifyApi.searchTracks(request.query.query, { limit: 2 })
//     .then(function(data) {
//       response.send(data.body);
//     }, failure);
//   })
// });

// const reAuthenticateOnFailure = (action) => {
//   action(() => {
//     authenticate(action);
//   })
// }

// app.get("/spotifyRedirectUri", function (request, response) {
//   response.send(JSON.stringify({
//     redirectUri
//   }, null, 2))
// });




// app.get("/playlists/:pl", function (req,res) {
//     spotifyApi.getPlaylist(req.params.pl) //'34inxLjFfBchpVk3nPQuDf')
//     .then(function(data){
//       let tracks = data.body.tracks.items;

//       console.log("    --------------------------------\n    data: ",data, "  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n");
//       console.log("     >>> \n     tracks: ", tracks)
      
//       console.log("     >>>>>>>>>>> \n ");
//       console.log("    \n\n\n *** tracks[1] *** ", tracks[1]);
//       console.log("    \n\n\n    *** tracks[1].track.name *** :         ",tracks[1].track.name);
//       // console.log("    \n\n\n *** tracks[1].track *** ",tracks[1].track);
//       // console.log("    \n\n\n\ *** tracks[1].track.artists *** ", tracks[1].track.artists);
//       console.log("    *** tracks[1].track.artists.name *** : ", tracks[1].track.artists[0].name);
//       console.log("      \n <<<<<<<<<<"); 

//       console.log("\n\n\n\n\n\n\n")

//       for (let i = 0; i < tracks.length; i++){
//         console.log("    \n    *** tracks[i].track.name *** :         ",tracks[i].track.name);
//         console.log("    *** tracks[i].track.artists.name *** : ", tracks[i].track.artists[0].name);
//       }

//       res.send(JSON.stringify(data))}
//     )
  
//   });



 //console.log('Listening on http://localhost:'+'8888');
 //app.listen(8888);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });
});


// // listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });
