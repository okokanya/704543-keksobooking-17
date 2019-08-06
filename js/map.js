'use strict';

(function () {
  var inputsInFieldsets = document.querySelectorAll('fieldset > input');
  var selectsInFieldsets = document.querySelectorAll('fieldset > select');

  var xcoord;
  var ycoord;
  window.xcoord = xcoord;
  window.ycoord = ycoord;

  window.createPinFragment = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.renderPins(window.filteredTypeFlatPins));
    document.querySelector('.map__pins').appendChild(fragment);
  };

  window.removeAllPins = function () {
    window.pinButtonAll = document.querySelectorAll('.map__pin--main');
    for (var i = 1; i < window.pinButtonAll.length; i++) {
      window.pinButtonAll[i].remove();
    }
  };

  window.mapPinMain.addEventListener('mousedown', function (evt) {
    var topPoint = 130;
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    window.getCoords = function (sortOfMouseMovm) {
      var addressInput = document.querySelector('#address');
      var shift = {
        x: startCoords.x - sortOfMouseMovm.clientX,
        y: startCoords.y - sortOfMouseMovm.clientY
      };

      startCoords = {
        x: sortOfMouseMovm.clientX,
        y: sortOfMouseMovm.clientY
      };

      window.xcoord = window.mapPinMain.offsetLeft - shift.x;
      window.ycoord = window.mapPinMain.offsetTop - shift.y;
      addressInput.value = window.xcoord + ', ' + window.ycoord;

      if (window.xcoord < window.mapfield.offsetWidth - window.PINWIDTH && window.xcoord > 1) {
        window.mapPinMain.style.left = window.xcoord + 'px';
      }

      if (window.ycoord > topPoint && window.ycoord < window.mapfield.offsetHeight - window.PINHEIGHT) {
        window.mapPinMain.style.top = window.ycoord + 'px';
      }
      if (shift.x === 0 && shift.y === 0) {
        addressInput.value = startCoords.x - window.PINWIDTH / 2 + ', ' + (startCoords.y - window.PINHEIGHT);
      }
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.getCoords(moveEvt);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.getCoords(upEvt);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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
    getDisabled(selectsInFieldsets);
    getDisabled(inputsInFieldsets);
  };

  var mappinact = function () {
    window.mapPinMain.addEventListener('mouseup', window.getActive);
  };

  document.addEventListener('DOMContentLoaded', window.getInactive);
  document.addEventListener('DOMContentLoaded', mappinact);

  window.getActive = function (e) {
    window.mapPinMain.removeEventListener('mouseup', window.getActive);
    window.fragment = document.createDocumentFragment();
    window.fragment.appendChild(window.renderPins(window.firstFivePins));
    window.indexInSelect();
    window.indexOutSelect();
    window.setMinPrice();
    window.mapfield.appendChild(window.fragment);
    window.allMap.classList.remove('map--faded');
    window.allForms.classList.remove('ad-form--disabled');
    getAbled(selectsInFieldsets);
    getAbled(inputsInFieldsets);
    window.getCoords(e);
    window.mapPinMain.removeEventListener('click', window.getActive);
  };

  window.changeGuestFilter = function () {
    window.makeXhr();
    window.filteredTypeFlatPins = window.myServerData.filter(function (dataitem) {
      if (window.homeGuestFilter.selectedIndex === 0) {
        return dataitem;
      } else if (window.homeGuestFilter.selectedIndex === 1) {
        return dataitem.offer.guests === 2;
      } else if (window.homeGuestFilter.selectedIndex === 2) {
        return dataitem.offer.guests === 1;
      } else {
        return dataitem.offer.guests === 0;
      }
    });
    window.removeAllPins();
    window.createPinFragment();
  };

  window.changeRoomsFilter = function () {
    window.makeXhr();
    window.filteredTypeFlatPins = window.myServerData.filter(function (dataitem) {
      if (window.homeRoomsFilter.selectedIndex === 0) {
        return dataitem;
      } else if (window.homeRoomsFilter.selectedIndex === 1) {
        return dataitem.offer.rooms === 1;
      } else if (window.homeRoomsFilter.selectedIndex === 2) {
        return dataitem.offer.rooms === 2;
      } else {
        return dataitem.offer.rooms === 3;
      }
    });
    window.removeAllPins();
    window.createPinFragment();
  };

  window.changePriceFilter = function () {
    window.makeXhr();
    window.filteredTypeFlatPins = window.myServerData.filter(function (dataitem) {
      if (window.homePriceFilter.selectedIndex === 0) {
        return dataitem;
      } else if (window.homePriceFilter.selectedIndex === 1) {
        return dataitem.offer.price > 10000 && dataitem.offer.price < 500000;
      } else if (window.homePriceFilter.selectedIndex === 2) {
        return dataitem.offer.price < 10000;
      } else {
        return dataitem.offer.price > 500000;
      }
    });
    window.removeAllPins();
    window.createPinFragment();
  };

  window.changeTypeFilter = function () {
    window.makeXhr();
    window.filteredTypeFlatPins = window.myServerData.filter(function (dataitem) {
      var typeDict = {
        0: dataitem.offer.type,
        1: 'palace',
        2: 'flat',
        3: 'house',
        4: 'bungalo'
      };
      return (dataitem.offer.type === typeDict[window.homeTypeFilter.selectedIndex]);
    });
    window.removeAllPins();
    window.createPinFragment();
  };
})();
