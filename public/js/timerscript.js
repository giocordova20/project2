var totalSeconds = 0;
var secondsElapsed = 0;
var interval;

let playlistUri = [];
let access_token = "";
let activePlaylist;
function getKey() {
  $.ajax({
    method: "GET",
    url: "/spotify/key",
  }).then(function (res) {
    console.log(res.key);
    access_token = res.key
  })
};
getKey();

// This launches the app by calling setTime() and renderTime()
getTimePreferences();

// These two functions are just for making sure the numbers look nice for the html elements
function getFormattedMinutes() {
  var secondsLeft = totalSeconds - secondsElapsed;
  var minutesLeft = Math.floor(secondsLeft / 60);
  var formattedMinutes;

  if (minutesLeft < 10) {
    formattedMinutes = "0" + minutesLeft;
  } else {
    formattedMinutes = minutesLeft;
  }

  return formattedMinutes;
};

function getFormattedSeconds() {
  var secondsLeft = (totalSeconds - secondsElapsed) % 60;
  var formattedSeconds;

  if (secondsLeft < 10) {
    formattedSeconds = `:0${secondsLeft}`;
  } else {
    formattedSeconds = `:${secondsLeft}`;
  }

  return formattedSeconds;
};

/* This function sets the totalSeconds variable (60 mins) which is used in 
   getFormattedMinutes/Seconds() and the renderTime() function.
   It essentially resets our timer */
function setTime() {
  var minutes = 1;
  clearInterval(interval);
  totalSeconds = minutes * 60;
};

// This function displays the time and checks to see if time is up.
function renderTime() {
  // When renderTime is called it sets the textContent for the timer html...
  $("#minutes").text(getFormattedMinutes());
  $("#seconds").text(getFormattedSeconds());

  // ..and then checks to see if the time has run out
  if (secondsElapsed >= totalSeconds) {
    stopTimer();
    $("#shotify-over").modal();
  }
};

// This function is where the "time" aspect of the timer runs
// Notice no settings are changed other than to increment the secondsElapsed var
function startTimer() {
  setTime();



  console.log(playlistUri);

  $.ajax({
    method: "PUT",
    url: "https://api.spotify.com/v1/me/player/play",
    headers: { 'Authorization': 'Bearer ' + access_token },
    data: JSON.stringify({
      "uris": playlistUri
    }),
  }).then(function (res) {
    console.log(res);
  });


  // need to get song uris into array/object from the db 'spotify_uri' in playlist_contents
  // use the uri to keep track of the currently playing song to use for start/resume.




  // We only want to start the timer if totalSeconds is > 0
  if (totalSeconds > 0) {
    /* The "interval" variable here using "setInterval()" begins the recurring increment of the
       secondsElapsed variable which is used to check if the time is up */
    interval = setInterval(function () {
      secondsElapsed++;
      console.log(secondsElapsed) // ** Remove before saving // **

      if (secondsElapsed % 30 == 0) {

        console.log("\n\n\n\n NEXT SONG. DRINK!\n\n");

        $.ajax({
          method: "POST",
          url: "https://api.spotify.com/v1/me/player/next",
          headers: { 'Authorization': 'Bearer ' + access_token },
        }).then(function (res) {
          console.log(res);
        });
      };

      // renderTime() is called here once every second.
      renderTime();
    }, 1000);
  };
};

/* This function stops the setInterval() set in startTimer but does not
   reset the secondsElapsed variable and does not reset the time by calling "setTime()" */
function pauseTimer() {
  $.ajax({
    method: "PUT",
    url: "https://api.spotify.com/v1/me/player/pause",
    headers: { 'Authorization': 'Bearer ' + access_token },
  }).then(function (res) {
    console.log(res);
  })



  clearInterval(interval);
  renderTime();
  //  });
};

/* This function stops the interval and also resets secondsElapsed
   and calls "setTime()" which effectively reset the timer
   to the input selections workMinutesInput.value and restMinutesInput.value */
function stopTimer() {

  secondsElapsed = 0;
  setTime();
  renderTime();
  /*$.ajax({
    method: "POST",
    url: "/spotify/pause",
  }).then(function (res) {
    console.log(res);
  });*/
};

function getTimePreferences() {
  // This is where the app is really kicked-off, setTime and renderTime are the two main routines.
  setTime();
  renderTime();
};

function getSongs(id) {
  playlistUri = [];
  activePlaylist = id;
  const songList = $(".songs");
  songList.empty();
  $.ajax({
    method: "GET",
    url: "/api/playlist/songs/" + id,
  }).then(function (res) {
    console.log(res[0]);

    // Grab the template script
    var source = $("#playlist-songs-template").html();
      
    // Compile the template
    var template = Handlebars.compile(source);


    for (let i = 0; i < res.length; i++) {
      
        // Define our data object
        var songs = {
          "id": res[i].id,
          "track": res[i].track,
          "artist": res[i].artist
        };

        // Pass our data to the template
        var theCompiledHtml = template(songs);
      
        // Add the compiled html to the page
        $('#playlist-songs').append(theCompiledHtml);
      
      
      
      // if (i < 10) {
      //   const card = $("<div>");
      //   const cardBody = $("<div>");
      //   card.addClass("Card");

      //   cardBody.addClass("card-body");
      //   cardBody.text(`${res[i].track} by ${res[i].artist}`);

      //   card.append(cardBody);
      //   songList.append(card);
      // }
      playlistUri.push(res[i].spotify_uri);
    };
    console.log(playlistUri);
    }
  )};

function setId() {
  let id = $(this).data('id');
  getSongs(id);
}


document.getElementById('js-search-form').addEventListener('submit', function (event) {
  event.preventDefault();
  let search = document.getElementById('js-search-input').value;
  if (search) {
    $.ajax({
      method: "GET",
      url: "spotify/track/" + search,
    }).then(function (res) {
      console.log(res);
      if (activePlaylist) {
        let playlist = {
          song_start_ms: 0,
          track: res.name,
          artist: res.artists[0].name,
          order_in_playlist: 1,
          image_href: "",
          spotify_uri: res.uri,
          playlistId: activePlaylist
        };
        $.post(`/api/${activePlaylist}`, playlist)
          .then(function(res) {
            console.log(res);
            getSongs(activePlaylist)
          });
      }

    });
  }
});



$(document).on("click", ".playlist_btn", setId);

$("#play").on("click", startTimer);
$("#pause").on("click", pauseTimer);
