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
  canvasRotation.load();

})();
