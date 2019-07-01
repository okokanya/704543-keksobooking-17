'use strict';

(function () {
  window.getRandomType = function (max) {
    var coeff = Math.floor(Math.random() * Math.floor(max));
    if (coeff === 0) {
      return 'palace';
    } else if (coeff === 1) {
      return 'flat';
    } else if (coeff === 2) {
      return 'house';
    } else {
      return 'bungalo';
    }
  };

  window.setMinPrice = function () {
    switch (window.placeType.value) {
      case 'palace':
        window.priceForNight.min = '10000';
        window.priceForNight.placeholder = '10000';
        break;
      case 'flat':
        window.priceForNight.min = '1000';
        window.priceForNight.placeholder = '1000';
        break;
      case 'house':
        window.priceForNight.min = '5000';
        window.priceForNight.placeholder = '5000';
        break;
      case 'bungalo':
        window.priceForNight.min = '0';
        window.priceForNight.placeholder = '0';
        break;
    }
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

  window.timein.addEventListener('change', window.indexInSelect);
  window.timeout.addEventListener('change', window.indexOutSelect);
})();
