'use strict';

(function () {

  window.renderPins = function (pinsDataToRender) {
    window.data = [];

    window.rerenderPopup = function (e) {

      
      window.photosToClear = document.querySelectorAll('.popup__photo');
      window.photosToClear.forEach(function (oneImg) {
        oneImg.remove();
      });


      window.flatInfo.remove();
      window.showFlatInfo(window.myServerData[e.currentTarget.id]);
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
      window.pinElement.addEventListener('click', window.rerenderPopup);
    }
    return window.pinTemplate;
  };
})();
