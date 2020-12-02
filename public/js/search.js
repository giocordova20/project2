/*var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: '7d508c40819643bd9043057da1035acc',
    clientSecret: '3438a5114e1b468ba7a8ace70662d829',
});

document.getElementById('js-search-form').addEventListener('submit', function () {
    spotifyApi.searchTracks('Love')
        .then(function (data) {
            console.log('Search by "Love"', data.body);
        }, function (err) {
            console.error(err);
        });
});*/

document.getElementById('js-search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let search = document.getElementById('js-search-input').value;
    if (search) {
        $.ajax({
            method: "GET",
            url: "spotify/track/" + search,
        }).then(function (res) {
            console.log(res);

        });
    }
});
