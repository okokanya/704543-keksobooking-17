'use strict';

(function () {
  window.PINHEIGHT = 88;
  window.PINWIDTH = 66;
  window.POINTERWIDTH = 22;
  window.flatInfo = document.querySelector('#card')
        .content
        .querySelector('.popup');
  window.featureslist = window.flatInfo.querySelector('.popup__features');
  window.main = document.querySelector('main');
  window.mapPinMain = document.querySelector('.map__pin--main');
  window.pinButton = document.querySelector('.map__pin');
  window.mapfield = document.querySelector('.map__pins');
  window.filterContainer = document.querySelector('.map__filters-container');
  window.allMap = document.querySelector('.map');
  window.allForms = document.querySelector('.ad-form');
  window.priceForNight = document.querySelector('#price');
  window.timein = document.querySelector('#timein');
  window.timeout = document.querySelector('#timeout');
  window.placeType = document.querySelector('#type');
  window.homeTypeFilter = document.querySelector('#housing-type');
  window.homePriceFilter = document.querySelector('#housing-price');
  window.homeRoomsFilter = document.querySelector('#housing-rooms');
  window.homeRoomsFilter = document.querySelector('#housing-rooms');
  window.homeGuestFilter = document.querySelector('#housing-guests');
  window.roomNumberForm = document.querySelector('#room_number');
  window.roomCapacity = document.querySelector('#capacity');

})();
