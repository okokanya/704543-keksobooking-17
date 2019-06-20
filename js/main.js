'use strict';

var pinTemplate = document.querySelector('#pin');
var pinButton = document.querySelector('.map__pin');
var placeForPins = document.querySelector('.map__pins');
var imgPin = pinButton.querySelector('img');
var allMap = document.querySelector('.map');
var allForms = document.querySelector('.ad-form');
var inputsInFieldsets = document.querySelectorAll('fieldset > input');
var selectsInFieldsets = document.querySelectorAll('fieldset > select');
var mapPinMain = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');
var PINNUMBER = 8;
var PINHEIGHT = 70;

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

var getInactive = function () {
  allMap.classList.add('map--faded');
  allForms.classList.add('ad-form--disabled');
  getDisabled(selectsInFieldsets);
  getDisabled(inputsInFieldsets);
};

var getActive = function () {
  allMap.classList.remove('map--faded');
  allForms.classList.remove('ad-form--disabled');
  getAbled(selectsInFieldsets);
  getAbled(inputsInFieldsets);
};

document.addEventListener('DOMContentLoaded', getInactive);
mapPinMain.addEventListener('click', getActive);

mapPinMain.addEventListener('mousedown', function (evt) {
  var PinCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  addressInput.value = PinCoords.x + ', ' + PinCoords.y;
});

document.querySelector('.map').classList.remove('map--faded');

var getRandomNumber = function (min, max) {
  var randomNumber = Math.random() * (max - min) + min;
  return randomNumber;
};

function generateRan(max) {
  var random = [];
  for (var i = 0; i < max; i++) {
    var temp = Math.ceil(Math.random() * max);
    if (random.indexOf(temp) === -1) {
      random.push(temp);
    } else {
      i--;
    }
  }
  return random;
}

var numbArrays = generateRan(8);

var getRandomType = function (min, max) {
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

var objectsArray = [];

var dataPins = function () {
  for (var i = 0; i < PINNUMBER; i++) {
    objectsArray.push({
      'author': {
        avatar: './img/avatars/user0' + numbArrays[i] + '.png',
      },
      'offer': {
        type: (getRandomType(1, 4)),
      },
      'location': {
        x: getRandomNumber(0, 750),
        y: getRandomNumber(130, 630)
      }
    });
  }
  return (objectsArray);
};

var renderPins = function (pinsDataToRender) {
  for (var i = 0; i < PINNUMBER; i++) {
    var pinElement = pinButton.cloneNode(true);
    pinElement.style.left = pinsDataToRender[i].location.x + 'px';
    pinElement.style.top = pinsDataToRender[i].location.y - PINHEIGHT + 'px';
    imgPin.src = pinsDataToRender[i].author.avatar;
    imgPin.alt = pinsDataToRender[i].offer.type;
    placeForPins.appendChild(pinElement);
  }
  return pinTemplate;
};

var fragment = document.createDocumentFragment();
fragment.appendChild(renderPins(dataPins()));
document.querySelector('.map__pins').appendChild(fragment);
