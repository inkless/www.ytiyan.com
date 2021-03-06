// load env first
require('dotenv').load();

var express = require('express');
var cors = require('cors');
var routes = require('./routes');

var STATIC_DIR = "public";
var PORT = 3000;

var app = express();

app.use(cors());

// use ejs engine
app.set('views', 'views');
app.set('view engine', 'ejs');

// Serve public folder
app.use(express.static(STATIC_DIR, {
  index: false
}));

// Adding router here
app.use('/', routes);

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  if (err) {
    res.status(err.status || 500);
    res.render('error');
  }
});

// start server
app.listen(PORT, function() {
  console.log('Server started at  http://localhost:%s', PORT);
});
