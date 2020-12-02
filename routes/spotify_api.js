var qs = require('querystring');


// init Spotify API wrapper
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId : '7d508c40819643bd9043057da1035acc',
  clientSecret : '3438a5114e1b468ba7a8ace70662d829',
});

const jssdkscopes = ["streaming", "user-read-birthdate", "user-read-email", "user-read-private", "user-modify-playback-state"];
const redirectUriParameters = {
  client_id: '7d508c40819643bd9043057da1035acc',
  response_type: 'token',
  scope: jssdkscopes.join(' '),
  redirect_uri: encodeURI('http://localhost:8888/callback'),
  show_dialog: true,
}

const redirectUri = `https://accounts.spotify.com/authorize?${qs.stringify(redirectUriParameters)}`;

function authenticate(callback) {
  spotifyApi.clientCredentialsGrant()
    .then(function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
    
      callback instanceof Function && callback();

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
      console.log('Something went wrong when retrieving an access token', err.message);
    });
}
authenticate();

module.exports = function(app, err) {
    if (err) throw err;
    app.get("/playlists/:pl", function (req,res) {
    spotifyApi.getPlaylist(req.params.pl) //'34inxLjFfBchpVk3nPQuDf')
    .then(function(data){
      let tracks = data.body.tracks.items;

      // console.log("    --------------------------------\n    data: ",data, "  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n");
      // console.log("     >>> \n     tracks: ", tracks)
      
      console.log("     >>>>>>>>>>> \n ");
      // console.log("    \n\n\n *** tracks[1] *** ", tracks[1]);
      // console.log("    \n\n\n    *** tracks[1].track.name *** :         ",tracks[1].track.name);
      // console.log("    *** tracks[1].track.artists.name *** : ", tracks[1].track.artists[0].name);
      console.log("      \n <<<<<<<<<<"); 

      console.log("\n\n\n\n\n\n\n")

      for (let i = 0; i < tracks.length; i++){
        console.log("    \n    *** tracks[i].track.name *** :         ",tracks[i].track.name);
        console.log("    *** tracks[i].track.artists.name *** : ", tracks[i].track.artists[0].name);
      }

      res.send(JSON.stringify(data))}
    )
  
  });

  app.get("/spotify/track/:search", function (req, res) {
    spotifyApi.searchTracks(req.params.search)
        .then(function (data) {
            res.json(data.body.tracks.items[0]);
        }, function (err) {
            console.error(err);
        });
});

/*app.get("/spotify/me", function (req, res) {

  spotifyApi.getMe()
  .then(function(data) {
    console.log('Some information about the authenticated user', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
});*/

};