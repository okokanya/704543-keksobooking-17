'use strict';

(function () {
  window.renderPins = function (pinsDataToRender) {
    window.data = [];
    var hh = function (e) {
      console.log(e.target);
      console.log(e.target.id);
      return e.target.id;
      console.log(window.data[e.target.hh()]);

      // console.log(window.data[e.target.id]);
    };



    for (var i = 0; i < pinsDataToRender.length; i++) {
      window.pinElement = window.pinButton.cloneNode(true);
      window.pinElement.style.left = pinsDataToRender[i].location.x + 'px';
      window.pinElement.style.top = pinsDataToRender[i].location.y - window.PINHEIGHT + 'px';
      window.imgPin.src = pinsDataToRender[i].author.avatar;
      window.imgPin.alt = pinsDataToRender[i].offer.type;
      window.mapfield.appendChild(window.pinElement);
      window.data.push(pinsDataToRender[i]);
      window.pinElement.setAttribute('id', i++);

      window.pinElement.addEventListener('click', hh);

    }
    return window.pinTemplate;
  };

})();
