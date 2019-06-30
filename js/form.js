'use strict';

(function () {
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

  window.timein.addEventListener('change', window.indexInSelect);
  window.timeout.addEventListener('change', window.indexOutSelect);
})();
