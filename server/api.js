var express = require('express');
var request = require('request');
var fs = require('fs');
var multer  = require('multer');

var MAX_IMAGE_SIZE = 1048576; // 1024 * 1024
var TOKEN = '123$Demo';

var router = express.Router();
var upload = multer({dest: process.env.IMAGES_UPLOAD_PATH});

router.post('/try-on', upload.fields([{
  name: 'image'}, {name: 'token'}, {name: 'glasses'
}]), tryOn);

//http://localhost:9000/getoglimage?
//input=/shared/images/input/Tom2.jpg&
//output=/shared/images/output/output1.jpg&
//glasses=RanGlasses2&
//licensekey=MYKEY
function tryOn(req, res, next) {
  if (req.body.token !== TOKEN) {
    return next(new Error("Invalid Token"));
  }

  if (!req.files || !req.files.image || !req.files.image[0]) {
    return next(new Error("Please upload valid image."));
  }

  var image = req.files.image[0];

  if (image.size > MAX_IMAGE_SIZE) {
    return next(new Error("File size limit to 1 MB."));
  }

  if (process.env.NODE_ENV === "development") {
    res.contentType('image/jpeg');
    res.sendFile(image.path);
    return;
  }

  var outputName = process.env.IMAGES_OUTPUT_PATH;

  fs.readFile(image.path, function(err, data) {
    if (err) {
      return next(new Error("Failed to read image."));
    }

    outputName += '/' + image.filename + '.jpg';

    requestProcessedImage({
      input: image.path,
      output: outputName,
      glasses: req.body.glasses
    }, function() {
      if (fs.existsSync(outputName)) {
        res.contentType('image/jpeg');
        res.sendFile(outputName);
      } else {
        return next(new Error("fail to find output"));
      }
    }, function(err) {
      return next(new Error("process fail"));
    });

  });
}

function requestProcessedImage(req, success, error) {
  var requestUrl =
    process.env.IMAGE2D_URL +
    '?input=' + req.input +
    '&output=' + req.output +
    '&glasses=' + req.glasses +
    '&licensekey=' + process.env.LICENSE_KEY;

  request(requestUrl, function(err, res, body) {
    if (err) {
      error(err);
    } else {
      success(body || res.body);
    }
  });

}

module.exports = router;
