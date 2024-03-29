'use strict';

(function () {
  window.renderPins = function (pinsDataToRender) {
    var pinTemplate = document.querySelector('#pin');
    window.rerenderPopup = function (e) {
      var popUpToRemove = document.querySelector('.popup');
      if (popUpToRemove) {
        popUpToRemove.remove();
      }

      var liToRemove = window.featureslist.getElementsByTagName('li');
      var arrLiToRemove = Array.from(liToRemove);
      arrLiToRemove.forEach(function (oneLi) {
        oneLi.remove();
      });

      window.photosToClear = document.querySelectorAll('.popup__photo');
      window.photosToClear.forEach(function (oneImg) {
        oneImg.remove();
      });
      window.showFlatInfo(window.data[e.currentTarget.id]);
    };
    window.data = [];

    for (var i = 0; i < pinsDataToRender.length; i++) {
      window.pinElement = window.pinButton.cloneNode(true);
      window.imgPin = window.pinElement.querySelector('img');
      window.pinElement.style.left = pinsDataToRender[i].location.x + 'px';
      window.pinElement.style.top = pinsDataToRender[i].location.y - window.PINHEIGHT + 'px';
      window.imgPin.src = pinsDataToRender[i].author.avatar;
      window.imgPin.alt = pinsDataToRender[i].offer.type;
      window.mapfield.appendChild(window.pinElement);
      window.data.push(pinsDataToRender[i]);
      window.pinElement.setAttribute('id', i);

      window.pinElement.addEventListener('click', window.rerenderPopup);
    }
    return pinTemplate;
  };
})();
