'use strict';

(function () {
  window.renderPins = function (pinsDataToRender) {
    window.data = [];

    for (var i = 0; i < pinsDataToRender.length; i++) {

      window.pinElement = window.pinButton.cloneNode(true);
      window.mapPinMain.remove();
      window.pinElement.style.left = pinsDataToRender[i].location.x + 'px';
      window.pinElement.style.top = pinsDataToRender[i].location.y - window.PINHEIGHT + 'px';
      window.imgPin.src = pinsDataToRender[i].author.avatar;
      window.imgPin.alt = pinsDataToRender[i].offer.type;
      window.mapfield.appendChild(window.pinElement);
      window.data.push(pinsDataToRender[i]);

      console.log(window.data);

      var hh = function (e) {
        console.log(e.target);
      };

      window.pinElement.addEventListener('click', hh);

    }
    return window.pinTemplate;
  };
})();
