var express = require('express');
var api = require('./api');

var STATIC_DIR = "public";
var router = express.Router();

// serve /
router.get('/', function(req, res) {
  res.render('index');
});
// serve demo
router.get('/demo', function(req, res) {
  res.render('demo');
});
// serve demo/result
router.get('/demo/result/:img_path', function(req, res) {
  res.render('demo_result', {
    imgUrl: '/result/' + req.params.img_path
  });
});
//serve api
router.use('/api', api);

module.exports = router;
