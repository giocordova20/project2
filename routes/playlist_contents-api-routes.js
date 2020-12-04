const db = require("../models");

module.exports = function (app) {
    // variables to place songs into handlebars
    // var songContainer = $(".song-container");
    // var songs;
    
    //get all songs in a playlist
    app.get("/api/playlist/songs/:playlistid", function (req, res) {
        db.playlist_content.findAll({
            where: {
                id: req.params.playlistid,
            }
        }).then(function (response) {
            res.json(response);
            // songs = response;
            // displaySongs();
        });
    });

    // function to display songs
    // function displaySongs() {
    //     songContainer.empty();
    //     var songsToAdd = [];
    //     for (var i = 0; i < songs.length; i++) {
    //         songsToAdd.push(createNewRow(songs[i]));
    //     };
    //     songContainer.append(songsToAdd);
    // };

    //adds a song to the playlist
    app.post("/api/playlist/playlistid:/songs", function (req, res) {
        db.Playlist_content.create(req.body).then(function (response) {
            res.json(response);
        });
    });

    //delete ong from playlist
    app.delete("/api/playlist/playlistid:/songs/:id", function (req, res) {
        db.Playlist_content.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (response) {
            res.json(response);
        });
    });

    //change song information
    //maybe change order
    //maybe change time song starts
    app.put("/api/playlist/playlistid:/songs", function (req, res) {
        db.Playlist_content.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (response) {
                res.json(response);
            });
    });


};
