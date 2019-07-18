'use strict';
(function () {

  window.showFlatInfo = function (dataForPopUpBlock) {

    var benefitsArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var placeBenefits = benefitsArray.filter(function (n) {
      return dataForPopUpBlock.offer.features.indexOf(n) !== -1;
    });

    for (var i = 0; i < placeBenefits.length; i++) {
      window.liOfBenefit = document.createElement('li');
      window.liOfBenefit.classList.add('popup__feature');
      window.liOfBenefit.classList.add('popup__feature--' + placeBenefits[i]);
      window.featureslist.appendChild(window.liOfBenefit);
    }

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
      return [titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]].join(' ');
    }
    var capacity = window.flatInfoTemplate.querySelector('.popup__text--capacity');
    capacity.textContent = dataForPopUpBlock.offer.rooms + ' ' + declensionOfNumber(dataForPopUpBlock.offer.rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + dataForPopUpBlock.offer.guests + ' ' + declensionOfNumber(dataForPopUpBlock.offer.guests, ['гостя', 'гостей', 'гостей']);

    var arriveLeaveTime = window.flatInfoTemplate.querySelector('.popup__text--time');
    arriveLeaveTime.textContent = 'Заезд после ' + dataForPopUpBlock.offer.checkin + ', выезд до ' + dataForPopUpBlock.offer.checkout;

    var description = window.flatInfoTemplate.querySelector('.popup__description');
    description.textContent = dataForPopUpBlock.offer.description;
    window.allMap.insertBefore(window.flatInfoTemplate, window.filterContainer);

    var avatar = window.flatInfoTemplate.querySelector('.popup__avatar');
    avatar.src = dataForPopUpBlock.author.avatar;

    window.popupphoto = document.querySelector('.popup__photos');
    for (var k = 0; k < dataForPopUpBlock.offer.photos.length; k++) {
      window.popUpImg = document.createElement('img');
      window.popUpImg.classList.add('popup__photo');
      window.popUpImg.width = 45;
      window.popUpImg.height = 40;
      window.popUpImg.alt = dataForPopUpBlock.offer.title;
      window.popUpImg.src = dataForPopUpBlock.offer.photos[k];
      window.popupphoto.appendChild(window.popUpImg);
    }


    var closePopUp = function () {
      var actPopup = document.querySelector('.popup');
      actPopup.style.display = 'none';
    };

    var closePopUpButton = document.querySelector('.popup__close');
    closePopUpButton.addEventListener('click', closePopUp);
  };
  return window.flatInfoTemplate;
})();
