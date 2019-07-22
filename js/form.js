'use strict';

(function () {
  var adFormSubmit = document.querySelector('.ad-form__submit');
  adFormSubmit.addEventListener('click', function (evt) {
    evt.preventDefault();
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

  window.roomsAndCapacity = function () {
    var options = window.capacityForm.getElementsByTagName('option');
    var optArray = Array.from(options);

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
        window.setAndRemove(optArray, [2]);
        break;
      case 1:
        window.setAndRemove(optArray, [1, 2]);
        break;
      case 2:
        window.setAndRemove(optArray, [0, 1, 2]);
        break;
      case 3:
        window.setAndRemove(optArray, [3]);
        break;
    }
  };

  window.roomNumberForm.addEventListener('change', window.roomsAndCapacity);
  window.timein.addEventListener('change', window.indexInSelect);
  window.timeout.addEventListener('change', window.indexOutSelect);
  window.homeTypeFilter.addEventListener('change', window.changeTypeFlat);
})();
