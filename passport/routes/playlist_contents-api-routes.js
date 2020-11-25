const db = require("../models");

module.exports = function (app) {
    //get all songs in a playlist
    app.get("/api/playlist/playlistid:/songs", function (req, res) {
        db.Playlist_content.findAll({
            where: {
                id: req.params.playlistid,
                include: [{
                    model: db.Song
                }]
            }
        }).then(function (response) {
            res.json(response);
        });
    });

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
