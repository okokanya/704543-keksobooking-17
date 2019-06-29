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

xhr.open('GET', 'https://js.dump.academy/keksobo666oking/data');
xhr.send();
