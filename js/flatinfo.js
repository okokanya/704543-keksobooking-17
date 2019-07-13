'use strict';
(function () {
  window.showFlatInfo = function (dataForPopUpBlock) {
    window.flatInfoTemplate = window.flatInfo.cloneNode(true);
    var title = window.flatInfoTemplate.querySelector('.popup__title');
    title.textContent = dataForPopUpBlock.offer.title;

    var address = window.flatInfoTemplate.querySelector('.popup__text--address');
    address.textContent = dataForPopUpBlock.offer.address;

    var price = window.flatInfoTemplate.querySelector('.popup__text--price');
    price.textContent = dataForPopUpBlock.offer.price;

    var type = window.flatInfoTemplate.querySelector('.popup__type');
    var typeDict = {
      'flat': 'Квартира',
      'palace': 'Дворец',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    };
    type.textContent = typeDict[dataForPopUpBlock.offer.type];
    
    function declensionOfNumber(number, titles) {
        var cases = [2, 0, 1, 1, 1, 2];
        return [titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ]].join(' ');
    }
   
    var capacity = window.flatInfoTemplate.querySelector('.popup__text--capacity');
    capacity.textContent = dataForPopUpBlock.offer.rooms + ' ' +  declensionOfNumber(dataForPopUpBlock.offer.rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + dataForPopUpBlock.offer.guests + ' ' + declensionOfNumber(dataForPopUpBlock.offer.guests, ['гостя', 'гостей', 'гостей']) ;

    var arriveLeaveTime = window.flatInfoTemplate.querySelector('.popup__text--time');
    arriveLeaveTime.textContent = 'Заезд после ' + dataForPopUpBlock.offer.checkin + ', выезд до ' + dataForPopUpBlock.offer.checkout;

    var Benefits = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner' ];
    console.log(Benefits.filter(value => -1 !== dataForPopUpBlock.offer.features.indexOf(value)))


    window.allMap.insertBefore(window.flatInfoTemplate, window.filterContainer);
  };
  return window.flatInfoTemplate;
})();
