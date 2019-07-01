'use strict';

(function () {
  window.renderPins = function (pinsDataToRender) {
    for (var i = 0; i < window.PINNUMBER; i++) {
      var pinElement = window.pinButton.cloneNode(true);
      pinElement.style.left = pinsDataToRender[i].location.x + 'px';
      pinElement.style.top = pinsDataToRender[i].location.y - window.PINHEIGHT + 'px';
      window.imgPin.src = pinsDataToRender[i].author.avatar;
      window.imgPin.alt = pinsDataToRender[i].offer.type;
      window.placeForPins.appendChild(pinElement);
    }
    return window.pinTemplate;
  };
})();
