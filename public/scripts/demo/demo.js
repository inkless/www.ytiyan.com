;(function() {
  'use strict';

  var glassesDemoSelector = '#glasses-demo';
  var glassesDemoOptions = {
    width: Math.min(640, $("#glasses-demo").width()),
    HeightWidthratio: 9 / 16,
    url: "/images/glasses/blackglasses",
    prefix: "blackglasses"
  };

  var canvasRotation = new CanvasRotation("#glasses-demo", glassesDemoOptions);

  $(".glasses-selector").on("click", ".glass-box", function() {
    var target = $(this).data("target");

    canvasRotation.setPath("/images/glasses/" + target, target);
  });

})();
