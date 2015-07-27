/**
 * Demo page
 */
;(function() {
  'use strict';

})();

/**
   * Section Upload Photo
   */
;(function() {
  'use strict';

  var DEMO_AVATR = "/images/glasses/avatar/1.jpg";

  var canvasContainer = $(".photo-box"),
    containerWidth = canvasContainer.width(),
    loadImageOptions = {
      maxWidth: containerWidth,
      canvas: true
    };

  // show demo avatar
  loadImage(DEMO_AVATR, function(canvas) {
    canvasContainer.append(canvas);
  }, loadImageOptions);

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

      loadImage(file, function(canvas) {
        canvasContainer.empty().append(canvas);
      }, options);

    });

  });

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

  var canvasRotation = new CanvasRotation(glassesDemoSelector, glassesDemoOptions);

  $(".glasses-selector").on("click", ".glass-box", function() {
    // toggle class
    $(".glasses-selector .glass-box-container").removeClass("selected");
    $(this).parent().addClass("selected");

    // set glasses path
    var target = $(this).data("target");
    canvasRotation.setPath("/images/glasses/" + target, target);
  });

})();
