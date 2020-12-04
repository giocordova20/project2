var totalSeconds = 0;
var secondsElapsed = 0;
var interval;

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
  var minutes = .05;
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
  /* $.ajax({
     method: "POST",
     url: "/spotify/play",
   }).then(function (res) {
     console.log(res);
 
   });*/


  /* $.ajax({
     method: "GET",
     url: "/spotify/key",
   }).then(function (res) {
     console.log(res);
     let key = res.key;
 
   });*/

  // We only want to start the timer if totalSeconds is > 0
  if (totalSeconds > 0) {
    /* The "interval" variable here using "setInterval()" begins the recurring increment of the
       secondsElapsed variable which is used to check if the time is up */
    interval = setInterval(function () {
      secondsElapsed++;
      // console.log(secondsElapsed) // ** Remove before saving // **

      // renderTime() is called here once every second.
      renderTime();
    }, 1000);
  }
};

/* This function stops the setInterval() set in startTimer but does not
   reset the secondsElapsed variable and does not reset the time by calling "setTime()" */
function pauseTimer() {
  /* $.ajax({
     method: "POST",
     url: "/spotify/pause",
   }).then(function (res) {
     console.log(res);*/



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

$("#play").on("click", startTimer);
$("#pause").on("click", pauseTimer);
