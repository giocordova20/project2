// const playlist = require("../../models/playlist");

$(document).ready(function() {
    const playlistList = $("#playlist-list");
    var playlistId;

    getPlaylists();

    // A function to get Authors and then render our list of Authors
  function getPlaylists() {
    $.get("/api/playlist", renderPlaylistList);
  }
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  function renderPlaylistList(data) {
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createPlaylistRow(data[i]));
    }
    playlistList.empty();
    console.log(rowsToAdd);
    console.log(playlistList);
    playlistList.append(rowsToAdd);
    playlistList.val(playlistId);
  }

  // Creates the author options in the dropdown
  function createPlaylistRow(playlist) {
    var list = $("<li>");
    list.text(playlist.name);
    playlistList.append(list);
    return list;
  }
})