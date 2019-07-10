'use strict';

window.main = document.querySelector('main');

var errorTemplate = document.querySelector('#error');
var cloneError = document.importNode(errorTemplate.content, true);
var pp = cloneError.querySelector('.error__message');
var button = cloneError.querySelector('.error__button');


var onError = function (message) {
  window.main.appendChild(cloneError);
  button.style.display = 'none';
  pp.textContent = 'Ошибка на сервере: ' + message;
};

var onSuccess = function (data) {
  window.myServerData = data;
  window.firstFivePins = window.myServerData.slice(0, 5);

  function typeOfFlat(item) {
    var typeDict = {
      0: 'flat',
      1: 'palace',
      2: 'flat',
      3: 'house',
      4: 'bungalo'
    };
    return (item.offer.type === typeDict[window.homeTypeFilter.selectedIndex]);
  }
  window.filteredTypeFlatPins = window.myServerData.filter(typeOfFlat);
};

var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  var error;
  switch (xhr.status) {
    case 200:
      onSuccess(xhr.response);
      break;
    case 400:
      error = 'Неверный запрос';
      break;
    case 401:
      error = 'Пользователь не авторизован';
      break;
    case 404:
      error = 'Ничего не найдено';
      break;
    default:
      error = xhr.status + ' ' + xhr.statusText;
  }
  if (error) {
    onError(error);
  }
});

xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
xhr.send();
