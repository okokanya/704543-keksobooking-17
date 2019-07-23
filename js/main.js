'use strict';

(function () {
  window.PINHEIGHT = 70;
  // window.pinTemplate = document.querySelector('#pin');
  window.flatInfo = document.querySelector('#card')
        .content
        .querySelector('.popup');
  window.featureslist = window.flatInfo.querySelector('.popup__features');

  window.mapPinMain = document.querySelector('.map__pin--main');
  window.pinButton = document.querySelector('.map__pin');
  window.mapfield = document.querySelector('.map__pins');
  window.filterContainer = document.querySelector('.map__filters-container');
  window.imgPin = window.pinButton.querySelector('img');
  window.allMap = document.querySelector('.map');
  window.allForms = document.querySelector('.ad-form');
  // window.addressInput = document.querySelector('#address');
  window.priceForNight = document.querySelector('#price');
  window.timein = document.querySelector('#timein');
  window.timeout = document.querySelector('#timeout');
  window.placeType = document.querySelector('#type');
  window.homeTypeFilter = document.querySelector('#housing-type');
  window.roomNumberForm = document.querySelector('#room_number');
  window.roomCapacity = document.querySelector('#capacity');
  window.capacityForm = document.querySelector('#capacity');
})();
