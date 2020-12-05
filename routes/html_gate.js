/*
If there are is over 21 = true then go to shotify 
else goes to 60min DJ

what need is a 
listener event -- to the input of the user 
*/

var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
    
    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/60seconddj", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/60secondDJ.html"));
    });

};
