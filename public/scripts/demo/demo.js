/**
 * Demo page
 */
;(function() {
  'use strict';

  window.yData = {};

  var sectionHeight = $(window).height() - 80;
  $("section .container").css("height", sectionHeight);

  $(".action-area").on("click", "button", function() {
    var $this = $(this),
      sel = $this.data("target"),
      direction = $this.data("action");

    if (direction === "left") {
      $(sel).addClass(direction);
    } else {
      $(sel).removeClass("left");
    }

  });
})();

/**
   * Section Upload Photo
   */
;(function() {
  'use strict';

  var DEMO_AVATAR = "/images/glasses/avatar/1.jpg";
  var CANVAS_WIDTH_HEIGHT_RATIO = 1;
  var IMAGE_MAX_WIDTH = 960;

  var canvasContainer = $(".photo-box"),
    canvas = canvasContainer.find("canvas")[0],
    ctx = canvas.getContext("2d"),
    containerWidth = canvasContainer.width(),
    loadImageOptions = {
      maxWidth: IMAGE_MAX_WIDTH,
      maxHeight: IMAGE_MAX_WIDTH,
      canvas: true
    };

  // show demo avatar
  drawImageInCanvas(DEMO_AVATAR, function() {
    saveBlob(canvas);
  });

  // handle btn show
  $("#imageInput").on("change", function(e) {
    if (!this.files || !this.files[0]) return;

    // show file name in imageFileView
    var fileName = this.value.replace(/\\/g, '/').replace(/.*\//, '');
    $("#imageFileView").val(fileName);

    // show image in canvas
    var file = this.files[0];
    loadImage.parseMetaData(file, function(data) {
      var options = {};
      if (data.exif) {
        options.orientation = data.exif.get('Orientation');
      }

      options = $.extend(loadImageOptions, options);

      loadImage(file, function(hiddenCanvas) {
        saveBlob(hiddenCanvas);
        drawImageInCanvas(hiddenCanvas.toDataURL());
      }, options);

    });

  });

  function saveBlob(canvas) {
    if (canvas.toBlob) {
      canvas.toBlob(function(blob) {
        yData.avatar = blob;
      }, 'image/jpeg');
    }
  }

  function clearCanvas() {
    ctx.clearRect (0, 0, canvas.width, canvas.height);
  }

  function scaleRatio(width, height) {
    var imgWidthHeightRatio = width / height;
    // for wide image, we need to test width
    if (imgWidthHeightRatio > CANVAS_WIDTH_HEIGHT_RATIO) {
      if (width > containerWidth) {
        var ratio = width / containerWidth;
        return {
          width: containerWidth,
          height: height / ratio,
          ratio: ratio
        };
      }
    }
    // for narrow image, we need to test height
    else {

      if (height > containerWidth) {
        var ratio = height / containerWidth;
        return {
          width: width / ratio,
          height: containerWidth,
          ratio: ratio
        };
      }
    }

    return {
      width: width,
      height: height,
      ratio: 1
    };
  }

  function drawImageInCanvas(src, success) {
    var img = new Image();
    img.onload = function() {
      var scaleObj = scaleRatio(this.width, this.height);

      canvas.width = scaleObj.width;
      canvas.height = scaleObj.height;

      if (scaleObj.ratio === 1) {
        ctx.drawImage(img, 0, 0);
      } else {
        ctx.drawImage(img, 0, 0, scaleObj.width, scaleObj.height);
      }

      success && success(scaleObj, img);
    };
    img.src = src;
  }

})();

 /**
  * Section Choose Glasses
  */
;(function() {
  'use strict';

  // glasses demo container selector
  var glassesDemoSelector = '#glasses-canvas-container';
  var glassesDemoOptions = {
    width: Math.min(640, $(glassesDemoSelector).width()),
    HeightWidthratio: 9 / 16,
    url: "/images/glasses/blackglasses",
    prefix: "blackglasses"
  };

  // choose default glasses
  yData.glasses = "blackglasses";

  var canvasRotation = new CanvasRotation(glassesDemoSelector, glassesDemoOptions);

  $(".glasses-selector").on("click", ".glass-box", function() {
    // toggle class
    $(".glasses-selector .glass-box-container").removeClass("selected");
    $(this).parent().addClass("selected");

    // set glasses path
    var target = $(this).data("target");
    yData.glasses = target;
    canvasRotation.setPath("/images/glasses/" + target, target);
  });

  // submit data
  $("#submit-btn").on("click", submitData);

  function submitData() {
    var formData = new FormData();

    formData.append('image', yData.avatar, 'avatar.jpg');
    formData.append('glasses', yData.glasses);
    formData.append('token', '123$Demo');

    showLoading();
    fetchBlob("/api/try-on", formData, function(blob) {
      rockImage(blob);
    });
  }

  function fetchBlob(uri, formData, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', uri, true);
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
      if (this.status == 200) {
        var blob = this.response;
        if (callback) {
          callback(blob);
        }
      }
      hideLoading();
    };
    xhr.send(formData);
  }

  function rockImage(blob) {
    var container = $("#result-canvas-container"),
      containerWidth = container.width();

    loadImage(blob, function(canvas) {
      container.empty().append(canvas);
    }, {
      canvas: true,
      maxWidth: containerWidth,
      maxHeight: containerWidth
    });
  }

  var loadingZone = $("#show-result .loading");
  var spinner = loadingZone.find(".mdl-spinner");
  var resultZone = $("#result-canvas-container");
  function showLoading() {
    loadingZone.show();
    spinner.addClass("is-active");
    resultZone.hide();
  }

  function hideLoading() {
    loadingZone.hide();
    spinner.removeClass("is-active");
    resultZone.show();
  }

})();
