'use strict';

var PINNUMBER = 8;
document.querySelector('.map').classList.remove('map--faded');
var objectsArray = [];

var getRandomNumber = function (min, max) {
  var randomNumber = Math.random() * (max - min) + min;
  return randomNumber;
};

var dataPins = function () {
  for (var i = 0; i < PINNUMBER; i++) {
    objectsArray.push({
      'author': {
        avatar: 'cтрока, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются'
      },
      'offer': {
        type: 'строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo'
      },
      'location': {
        x: getRandomNumber(0, 750),
        y: getRandomNumber(130, 630)
      }
    });
  }
  return (objectsArray);
};

var pinTemplate = document.querySelector('#pin');
var pinButton = document.querySelector('.map__pin');
var placeForPins = document.querySelector('.map__pins');

var renderPins = function (pinsDataToRender) {
  for (var i = 0; i < PINNUMBER; i++) {
    var pinElement = pinButton.cloneNode(true);
    pinElement.style.left = pinsDataToRender[i].location.x + 'px';
    pinElement.style.top = pinsDataToRender[i].location.y + 'px';
    pinElement.src = '{{pinsData.author.avatar}}';
    pinElement.alt = '{{pinsData.offer}}';
    placeForPins.appendChild(pinElement);
  }
  return pinTemplate;
};

var fragment = document.createDocumentFragment();
fragment.appendChild(renderPins(dataPins()));
document.querySelector('.map__pins').appendChild(fragment);
