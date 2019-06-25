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
var priceForNight = document.querySelector('#price');
var timein = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');
var placeType = document.querySelector('#type');
var xcoord;
var ycoord;

var PINNUMBER = 8;
var PINHEIGHT = 70;

var indexInSelect = function () {
  var timeinSelect = timein.selectedIndex;
  var timeoutSelect;
  timeoutSelect = timeinSelect;
  timeout.selectedIndex = timeoutSelect;
};

var indexOutSelect = function () {
  var timeOutSelect = timeout.selectedIndex;
  var timeInSelect;
  timeInSelect = timeOutSelect;
  timein.selectedIndex = timeInSelect;
};

timein.addEventListener('change', indexInSelect);
timeout.addEventListener('change', indexOutSelect);


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

var setMinPrice = function () {
  switch (placeType.value) {
    case 'palace':
      priceForNight.min = '10000';
      priceForNight.placeholder = '10000';
      break;
    case 'flat':
      priceForNight.min = '1000';
      priceForNight.placeholder = '1000';
      break;
    case 'house':
      priceForNight.min = '5000';
      priceForNight.placeholder = '5000';
      break;
    case 'bungalo':
      priceForNight.min = '0';
      priceForNight.placeholder = '0';
      break;
  }
};

placeType.addEventListener('change', setMinPrice);

var getInactive = function () {
  allMap.classList.add('map--faded');
  allForms.classList.add('ad-form--disabled');
  getDisabled(selectsInFieldsets);
  getDisabled(inputsInFieldsets);
};

document.addEventListener('DOMContentLoaded', getInactive);

var getActive = function () {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderPins(dataPins()));
  indexInSelect();
  indexOutSelect();

  setMinPrice();
  document.querySelector('.map__pins').appendChild(fragment);
  allMap.classList.remove('map--faded');
  allForms.classList.remove('ad-form--disabled');
  getAbled(selectsInFieldsets);
  getAbled(inputsInFieldsets);
};

mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var getCoords = function (sortOfMouseMovm) {
    var shift = {
      x: startCoords.x - sortOfMouseMovm.clientX,
      y: startCoords.y - sortOfMouseMovm.clientY
    };

    startCoords = {
      x: sortOfMouseMovm.clientX,
      y: sortOfMouseMovm.clientY
    };

    ycoord = mapPinMain.offsetTop - shift.y;
    xcoord = mapPinMain.offsetLeft - shift.x;
    addressInput.value = xcoord + ', ' + ycoord;

    if (xcoord > 50 && xcoord < 1090) {
      mapPinMain.style.left = xcoord + 'px';
    }
    if (ycoord > 50 && ycoord < 640) {
      mapPinMain.style.top = ycoord + 'px';
    }
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    getCoords(moveEvt);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    getCoords(upEvt);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  document.addEventListener('mouseup', getActive);
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

var getRandomType = function (max) {
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
