var qs = require('querystring');


// init Spotify API wrapper
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: '7d508c40819643bd9043057da1035acc',
  clientSecret: '3438a5114e1b468ba7a8ace70662d829',
});

const jssdkscopes = ["streaming", "user-read-birthdate", "user-read-email", "user-read-private", "user-modify-playback-state", "playlist-modify-private", "playlist-modify-public"];
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
    .then(function (data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);

      callback instanceof Function && callback();

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    }, function (err) {
      console.log('Something went wrong when retrieving an access token', err.message);
    });
}
authenticate();

module.exports = function (app, err) {

  if (err) throw err;
  app.get("/playlists/:pl", function (req, res) {

    spotifyApi.getPlaylist(req.params.pl) //'34inxLjFfBchpVk3nPQuDf')
      .then(function (data) {

        let tracks = data.body.tracks.items;

        // console.log("    --------------------------------\n    data: ",data, "  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n\n\n\n\n\n\n\n");
        // console.log("     >>> \n     tracks: ", tracks)

        // console.log("     \n\n\n\n\n\n\n\n\n\<<<<<<<<<<  >>>>>>>>>>>");
        // console.log("    \n\n\n *** tracks[1] *** ", tracks[1]);
        // console.log("    \n\n\n *** tracks[1].track.album.images[0] *** ", tracks[1].track.album.images);
        // console.log("    \n\n\n *** tracks[1].track.album.images[0] *** ", tracks[1].track.album.images[2]);
        // console.log("    \n\n\n    *** tracks[1].track.name *** :         ",tracks[1].track.name);
        // console.log("    *** tracks[1].track.artists.name *** : ", tracks[1].track.artists[0].name);
        // console.log("      \n      <<<<<<<<<<  >>>>>>>>>>> \n "); 
        // console.log("\n\n\n\n\n")

        let playlistInfo = []

        for (let i = 0; i < tracks.length; i++) {
          let addedAt = tracks[i].added_at;
          let track = tracks[i].track.name;
          let artist = tracks[i].track.artists[0].name;
          let explicit = tracks[i].track.explicit;
          let track_uri = tracks[i].track.uri;
          let image_href = tracks[i].track.album.images[2].url;

          // console.log("    \n    *** addeAt                   :         ",addedAt);
          // console.log("    *** track                    :         ",track);
          // console.log("    *** artist                   : ", artist);
          // console.log("    *** explicit                 : ", explicit);
          // console.log("    *** uri                 : ", track_uri);
          // console.log("    *** tracks[i].track.album.images[2] *** : ", image_href);

          playlistInfo[i] = { addedAt: addedAt, track: track, artist: artist, explicit: explicit, image_href: image_href, track_uri: track_uri}
          playlistInfo.push(playlistInfo[i]);
        }

        // console.log("\n\n\n\n\n playlistInfo", playlistInfo);

        res.send(JSON.stringify(playlistInfo));
      }
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