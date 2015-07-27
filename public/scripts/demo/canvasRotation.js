/**
 * @fileOverview handle canvas rotation
 */

;(function(win, $) {
  'use strict';

  var MIN_DEGREE_INDEX = -17;
  var MAX_DEGREE_INDEX = 18;
  var isTouchable =  'ontouchstart' in window || navigator.msMaxTouchPoints;
  var mouseMoveEvent = isTouchable ? 'touchmove' : 'mousemove';

  var defaultOptions = {
    width: 640,
    height: 360
  };

  /**
   * @class CanvasRotation
   */
  var CanvasRotation = function(sel, options) {
    this.$container = $(sel);
    this.options = $.extend(defaultOptions, options);

    this._init();
  };

  CanvasRotation.prototype._init = function() {
    this.setPath(this.options.url, this.options.prefix);

    // calc gap
    this.middlePoint = Math.floor(parseInt(this.options.width) / 2);
    this.gap = Math.floor(parseInt(this.options.width) / 36);

    this.canvas = appendCanvas.call(this);
    this.ctx = this.canvas.getContext("2d");
  };

  CanvasRotation.prototype.setPath = function(url, prefix) {
    this.path = url + '/' + prefix;
    this.images = preloadImages.call(this);
  };

  CanvasRotation.prototype.draw = function(index) {
      if (index < MIN_DEGREE_INDEX) {
        index = MAX_DEGREE_INDEX;
      }
      this.ctx.drawImage(this.images[index], 0, -1, this.canvas.width, this.canvas.height);
  };

  function appendCanvas() {
    var $canvas = $("<canvas />").appendTo(this.$container),
      canvas = $canvas[0];
    canvas.width = this.options.width;
    canvas.height = canvas.width * this.options.HeightWidthratio;

    // expose this variable to local variables
    var me = this;
    var offsetLeft = canvas.getBoundingClientRect().left;

    // add events to canvas
    $canvas.on(mouseMoveEvent, function(e) {
      var clientX;
      if (isTouchable) {
        clientX = e.originalEvent.touches[0].clientX;
      } else {
        clientX = e.originalEvent.clientX;
      }
      var index = Math.floor((clientX - me.middlePoint - offsetLeft) / me.gap);
      me.draw(index);
    });

    return canvas;
  }

  function preloadImages() {
    var images = {},
      imagePath,
      imageInstance,
      degree;

    var me = this;
    // hard code here for now
    for (var i = MIN_DEGREE_INDEX; i <= MAX_DEGREE_INDEX; i++) {
      if (i === 0) {
        degree = '+0';
      } else if (i > 0) {
        degree = '+' + i + '0';
      } else {
        degree = i + '0';
      }
      imagePath = this.path + degree + '.jpg';
      imageInstance = new Image();

      if (i === 0) {
        imageInstance.onload = function(e) {
          me.draw(0);
        };
      }


      imageInstance.src = imagePath;
      images[i] = imageInstance;
    }

    return images;
  }

  window.CanvasRotation = CanvasRotation;

})(window, jQuery);
