;(function() {
  'use strict';

  var glassesDemoSelector = '#glasses-canvas-container';
  var glassesDemoOptions = {
    width: Math.min(640, $(glassesDemoSelector).width()),
    HeightWidthratio: 9 / 16,
    url: "/images/glasses/blackglasses",
    prefix: "blackglasses"
  };

  var canvasRotation = new CanvasRotation(glassesDemoSelector, glassesDemoOptions);

  $(".glasses-selector").on("click", ".glass-box", function() {
    var target = $(this).data("target");

    canvasRotation.setPath("/images/glasses/" + target, target);
  });

})();
