const db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the playlists
  app.get("/api/playlist", function (req, res) {

    db.playlist.findAll({
    }).then(function (response) {

      res.json(response);
    });
  });

  // Get route for retrieving a single playlist
  app.get("/api/playlist/:id", function (req, res) {
    db.Playlist.findOne({
      where: {
        id: req.params.id,
      }
    }).then(function (response) {
      console.log(response);
      res.json(response);
    });
  });

  // POST route for creating new playlist
  app.post("/api/playlist", function (req, res) {
    db.Playlist.create(req.body).then(function (response) {
      res.json(response);
    });
  });

  // DELETE route for deleting a playlist
  app.delete("/api/playlist/:id", function (req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (response) {
      res.json(response);
    });
  });

  // PUT route for updating playlist
  //most likely changing a playlists name
  app.put("/api/playlist", function (req, res) {
    db.Post.update(
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
