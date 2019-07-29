'use strict';

window.removeWindow = function () {
  document.querySelector('.success').remove();
  window.removeEventListener('mousedown', window.removeWindow);
  window.main.appendChild(window.mapPinMain);
  window.mapPinMain.querySelector('img').src = 'img/muffin-red.svg';
};

window.removeWindowWithEsc = function (ev) {
  if (ev.keyCode === 27) {
    document.querySelector('.success').remove();
    window.main.appendChild(window.mapPinMain);
  }
};

(function () {
  var adFormSubmit = document.querySelector('.ad-form__submit');
  adFormSubmit.addEventListener('click', function (evt) {
    var title = document.querySelector('#title');
    title.value = title.textContent;
    // evt.preventDefault();


    document.getElementById('title').value = '';
    document.getElementById('address').value = '';

    window.getInactive();
    window.removeAllPins();
    document.querySelector('.popup').remove();

    var successTemplate = document.querySelector('#success');
    window.cloneSuccess = document.importNode(successTemplate.content, true);
    window.main.appendChild(window.cloneSuccess);
    window.addEventListener('mousedown', window.removeWindow);
    window.addEventListener('keydown', window.removeWindowWithEsc);
    // window.mapPinMain.remove();
  });

  window.setMinPrice = function () {
    var minPriceDict = {
      'palace': '10000',
      'flat': '1000',
      'house': '5000',
      'bungalo': '0'
    };
    window.priceForNight.min = minPriceDict[window.placeType.value];
    window.priceForNight.placeholder = minPriceDict[window.placeType.value];
  };

  window.placeType.addEventListener('change', window.setMinPrice);
  window.indexInSelect = function () {
    var timeinSelect = window.timein.selectedIndex;
    var timeoutSelect;
    timeoutSelect = timeinSelect;
    window.timeout.selectedIndex = timeoutSelect;
  };

  window.indexOutSelect = function () {
    var timeOutSelect = window.timeout.selectedIndex;
    var timeInSelect;
    timeInSelect = timeOutSelect;
    window.timein.selectedIndex = timeInSelect;
  };

  window.roomsFromCapacity = function () {
    var options = window.capacityForm.getElementsByTagName('option');
    var optionsArray = Array.from(options);

    window.setAndRemove = function (array, whereToSet) {
      for (var i = 0; i < array.length; i++) {
        array[i].setAttribute('disabled', false);
      }
      for (var k = 0; k < whereToSet.length; k++) {
        array[whereToSet[k]].removeAttribute('disabled', false);
      }
    };

    switch (window.roomNumberForm.selectedIndex) {
      case 0:
        window.setAndRemove(optionsArray, [2]);
        break;
      case 1:
        window.setAndRemove(optionsArray, [1, 2]);
        break;
      case 2:
        window.setAndRemove(optionsArray, [0, 1, 2]);
        break;
      case 3:
        window.setAndRemove(optionsArray, [3]);
        break;
    }
  };

  window.roomNumberForm.addEventListener('change', window.roomsFromCapacity);
  window.timein.addEventListener('change', window.indexInSelect);
  window.timeout.addEventListener('change', window.indexOutSelect);
  window.homeTypeFilter.addEventListener('change', window.changeTypeFlat);
})();
