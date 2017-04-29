// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//  (DATA)
// =============================================================
var tables = [];
// tables[0] = {
//     customerName: "Joy Chang",
//     phoneNumber: "319-333-5804",
//     customerEmail: "joy.cy.chang@gmail.com",
//     customerID: "joyiscool"
// }
var waitlist = [];
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});


//Current reservation data--tables and waitlist - provides JSON
app.get("/api/tables", function(req, res) {
    return res.json(tables);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
});

app.post("/api/clear", function(req, res) {
    tables = [];  
    waitlist = [];
    // return res.json(tables);
});

// Create New Table- take Reservation in JSON input
app.post("/api/tables", function(req, res) {
    var newReservation = req.body;
    console.log(newReservation);

    if (tables.length <= 2) {
        tables.push(newReservation);
        res.json(tables)
    } else if (tables.length > 2) {
        waitlist.push(newReservation);
        res.json(tables);
    }


});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
