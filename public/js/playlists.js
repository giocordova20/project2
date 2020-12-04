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
    playlistList.empty();

    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createPlaylistRow(data[i]));
    }
    //console.log(rowsToAdd[0]);
    //console.log(playlistList);
    //playlistList.append(rowsToAdd);
    //playlistList.val(playlistId);
  }

  // Creates the author options in the dropdown
  function createPlaylistRow(playlist) {
    let card = $("<div>");
    let cardBody = $("<div>");
    let button = $("<button>")
    card.addClass("Card");
    //list.val(playlist.id);

    button.text("Select");
    button.addClass("playlist_btn");
    button.attr("data-id", playlist.id);

    cardBody.addClass("card-body");
    cardBody.text(playlist.playlist_name);

    cardBody.append(button);
    card.append(cardBody);
    playlistList.append(card);
    return card;
  }
})