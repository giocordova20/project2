

/*document.getElementById('js-search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let search = document.getElementById('js-search-input').value;
    if (search) {
        $.ajax({
            method: "GET",
            url: "spotify/track/" + search,
        }).then(function (res) {
            console.log(res.uri);

        });

    /*    $.ajax({
            method: "POST",
            url: "/spotify/playlist/" + search,
        }).then(function (res) {
            console.log(res);

        });*/
/*    }
});*/
