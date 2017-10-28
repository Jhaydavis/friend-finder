//Variables
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;
// Set up middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(__dirname + '/app/public'));
// Routes
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);
// Listen
app.listen(PORT, function() {
  console.log("Now active on PORT: " + PORT);
});
