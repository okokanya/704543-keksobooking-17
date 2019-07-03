'use strict';

(function () {
  var xcoord;
  var ycoord;
  window.xcoord = xcoord;
  window.ycoord = ycoord;

  window.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var getCoords = function (sortOfMouseMovm) {
      var shift = {
        x: startCoords.x - sortOfMouseMovm.clientX,
        y: startCoords.y - sortOfMouseMovm.clientY
      };
      startCoords = {
        x: sortOfMouseMovm.clientX,
        y: sortOfMouseMovm.clientY
      };
      window.ycoord = window.mapPinMain.offsetTop - shift.y;
      window.xcoord = window.mapPinMain.offsetLeft - shift.x;
      window.addressInput.value = window.xcoord + ', ' + window.ycoord;
      if (window.xcoord > (window.mapfield.offsetWidth / 100 * 5) && window.xcoord < window.mapfield.offsetWidth - (window.mapfield.offsetWidth / 100 * 10)) {
        window.mapPinMain.style.left = window.xcoord + 'px';
      }
      if (window.ycoord > 50 && window.ycoord < window.mapfield.offsetHeight - window.mapfield.offsetHeight / 100 * 10) {
        window.mapPinMain.style.top = window.ycoord + 'px';
      }
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      getCoords(moveEvt);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      getCoords(upEvt);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseup', window.getActive);
  });
  document.querySelector('.map').classList.remove('map--faded');

  var getDisabled = function (collectionToDisable) {
    for (var i = 0; i < collectionToDisable.length; i++) {
      collectionToDisable[i].disabled = true;
    }
  };
  var getAbled = function (collectionToAble) {
    for (var i = 0; i < collectionToAble.length; i++) {
      collectionToAble[i].disabled = false;
    }
  };

  window.getInactive = function () {
    window.allMap.classList.add('map--faded');
    window.allForms.classList.add('ad-form--disabled');
    getDisabled(window.selectsInFieldsets);
    getDisabled(window.inputsInFieldsets);
  };

  document.addEventListener('DOMContentLoaded', window.getInactive);

  window.getActive = function () {

    window.fragment = document.createDocumentFragment();
    window.fragment.appendChild(window.renderPins(window.firstFivePins));
    window.indexInSelect();
    window.indexOutSelect();
    window.setMinPrice();
    window.mapfield.appendChild(window.fragment);
    window.allMap.classList.remove('map--faded');
    window.allForms.classList.remove('ad-form--disabled');
    getAbled(window.selectsInFieldsets);
    getAbled(window.inputsInFieldsets);
    window.pinButtonAll = document.querySelectorAll('.map__pin--main');
  };

  window.changeTypeFlat = function () {
    window.pinButtonAll.remove();
    var fragment2 = document.createDocumentFragment();
    fragment2.appendChild(window.renderPins(window.filteredTypeFlatPins));
    document.querySelector('.map__pins').appendChild(fragment2);
  };

})();
