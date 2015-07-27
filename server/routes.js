var express = require('express');
var api = require('./api');

var STATIC_DIR = "public";
var router = express.Router();

// serve /
router.get('/', function(req, res) {
  res.sendFile('index.html', { root: STATIC_DIR });
});
// serve demo
router.get('/demo', function(req, res) {
  res.sendFile('demo.html', { root: STATIC_DIR });
});
//serve api
router.use('/api', api);

module.exports = router;
