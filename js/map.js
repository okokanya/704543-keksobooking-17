'use strict';

(function () {

  var inputsInFieldsets = document.querySelectorAll('fieldset > input');
  var selectsInFieldsets = document.querySelectorAll('fieldset > select');

  var xcoord;
  var ycoord;
  window.xcoord = xcoord;
  window.ycoord = ycoord;

  window.removeAllPins = function () {
    window.pinButtonAll = document.querySelectorAll('.map__pin--main');
    window.pinButtonAll.forEach(function (item) {
      item.remove();
    });
  };

  window.mapPinMain.addEventListener('mousedown', function (evt) {

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

      window.ycoord = window.mapPinMain.offsetTop - shift.y;
      window.xcoord = window.mapPinMain.offsetLeft - shift.x;
      addressInput.value = window.xcoord + ', ' + window.ycoord;

      if (window.xcoord > (window.mapfield.offsetWidth / 100 * 5) && window.xcoord < window.mapfield.offsetWidth - (window.mapfield.offsetWidth / 100 * 10)) {
        window.mapPinMain.style.left = window.xcoord + 'px';
      }
      if (window.ycoord > 50 && window.ycoord < window.mapfield.offsetHeight - window.mapfield.offsetHeight / 100 * 10) {
        window.mapPinMain.style.top = window.ycoord + 'px';
      }
      if (shift.x === 0 && shift.y === 0) {
        addressInput.value = startCoords.x + ', ' + startCoords.y;
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
    window.mapPinMain.addEventListener('mouseup', window.getActive);
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

  document.addEventListener('DOMContentLoaded', window.getInactive);

  window.getActive = function (e) {
    window.fragment = document.createDocumentFragment();
    window.fragment.appendChild(window.renderPins(window.firstFivePins));
    window.showFlatInfo(window.forPopUpBlock);
    window.indexInSelect();
    window.indexOutSelect();
    window.setMinPrice();
    window.mapfield.appendChild(window.fragment);
    window.allMap.classList.remove('map--faded');
    window.allForms.classList.remove('ad-form--disabled');
    getAbled(selectsInFieldsets);
    getAbled(inputsInFieldsets);
    window.getCoords(e);
    document.removeEventListener('mouseup', window.getActive);
    window.mapPinMain.remove();
    // window.mapPinMain.style.display = 'none';

  };

  window.changeTypeFlat = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();

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

    // window.pinButtonAll = document.querySelectorAll('.map__pin--main');
    // window.pinButtonAll.forEach(function (item) {
    //   item.remove();
    // });

    var fragment2 = document.createDocumentFragment();
    fragment2.appendChild(window.renderPins(window.filteredTypeFlatPins));
    document.querySelector('.map__pins').appendChild(fragment2);
  };
})();
