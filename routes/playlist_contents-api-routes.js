module.exports = function (app) {
    const db = require("../models");

    //get all songs in a playlist by plalist id // **This is working
    app.get("/api/playlist/songs/:playlistid", function (req, res) {
        db.playlist_content.findAll({
            where: {
                playlistId: req.params.playlistid,
            }
            }).then(function (response) {
            res.json(response);
        });
    });

    // Add a song to the playlist  // Need to get working. Will be called from a button
    app.post("/api/:playlistid", function (req, res) {
        db.playlist_content.create(req.body).then(function (response) {
            res.json(response);
        });
    });

    //delete song from playlist  // Need to get working if possible. Will be called from a button
    app.delete("/api/playlist/:playlistid/:songs", function (req, res) {
        db.playlist_content.destroy({
            where: {
                playlistId: req.params.id,
                songs: req.params.track
            }
        }).then(function (response) {
            res.json(response);
        });
    });

    //change song information
    //maybe change order
    //maybe change time song starts
    // Put a song into a playlist   // Need to get working if possible. Will be called from a button
    app.put("/api/playlist/:playlistid/:songs", function (req, res) {
        db.playlist_content.update(
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
