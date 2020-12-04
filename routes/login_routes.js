
const request = require('request'); // "Request" library
const querystring = require('querystring');
var cookieParser = require('cookie-parser');


// init Spotify API wrapper
var SpotifyWebApi = require('spotify-web-api-node');


module.exports = function (app) {

  let active_song = "";

  const client_id = '29fae85026954a9fbc2ebcc46a3d8986'; // Your client id
  const client_secret = '1329d539e2354828b1c9eab26db73f95'; // Your secret
  const redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri


  var spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
  });


  const generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const stateKey = 'spotify_auth_state';



  app.get('/login', function (req, res) {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
    // your application requests authorization
    const scope = 'streaming user-read-email user-read-private user-modify-playback-state playlist-modify-private playlist-modify-public';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });

  app.get('/callback', function (req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };

      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {

          const access_token = body.access_token,
            refresh_token = body.refresh_token;

          const options = {
            url: 'https://open.spotify.com/album/4RuzGKLG99XctuBMBkFFOC',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };


          spotifyApi.setAccessToken(access_token);
          spotifyApi.setRefreshToken(refresh_token);

          // use the access token to access the Spotify Web API
          request.get(options, function (error, response, body) {
            console.log(body);
          });

          // we can also pass the token to the browser to make requests from there
          res.redirect('/');
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  });

  app.get('/refresh_token', function (req, res) {

    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  });


  app.get("/spotify/track/:search", function (req, res) {
    spotifyApi.searchTracks(req.params.search)
      .then(function (data) {
        active_song = data.body.tracks.items[0].uri;
        res.json(data.body.tracks.items[0]);
      }, function (err) {
        console.error(err);
      });
  });

  app.get("/spotify/myPlaylists", function (req, res) {

    spotifyApi.getMe()
      .then(function (data) {
        spotifyApi.getUserPlaylists(data.display_name)
          .then(function (data) {
            console.log('Retrieved playlists', data.body);
            res.json(data.body);
          }, function (err) {
            console.log('Something went wrong!', err);
          });
      }, function (err) {
        console.log('Something went wrong!', err);
      });
  });

  app.post("/spotify/playlist/:name", function (req, res) {

    let playlistName = req.params.name;
    spotifyApi.createPlaylist(playlistName, { 'description': 'My description', 'public': true })
      .then(function (data) {
        console.log('Created playlist!');
      }, function (err) {
        console.log('Something went wrong!', err);
      });
  });

  app.post("/spotify/playlist/track", function (req, res) {
    let playlist = "";
    let tracks = ["spotify:track:3Cx4yrFaX8CeHwBMReOWXI"];

    
    spotifyApi.addTracksToPlaylist(playlist, tracks)
      .then(function (data) {
        console.log('Added tracks to playlist!');
      }, function (err) {
        console.log('Something went wrong!', err);
      });

  });



  //start playback
 /* app.post("/spotify/play", function (req, res) {


    spotifyApi.play()
      .then(function () {
        console.log('Playback started');
      }, function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      });
  });

  //pause playback
  app.post("/spotify/pause", function (req, res) {
    spotifyApi.pause()
      .then(function () {
        console.log('Playback paused');
      }, function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      });
  });

  //route for player to time
  app.post("/spotify/:time", function (req, res) {
    let positionMs = req.params.time;
    spotifyApi.seek(positionMs)
      .then(function () {
        console.log('Seek to ' + positionMs);
      }, function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      });
  });

  //skip to next song
  app.post("/spotify/skipToNext", function (req, res) {
    spotifyApi.skipToNext()
      .then(function () {
        console.log('Skip to next');
      }, function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      });
  });*/

  app.get("/spotify/key", function (req, res) {
    res.json({ key: spotifyApi.getAccessToken() });
  });


  app.get("/activeSong", function (req, res) {
    res.json({song: active_song});
  })
}

