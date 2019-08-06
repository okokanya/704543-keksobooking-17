'use strict';
(function () {
  var errorTemplate = document.querySelector('#error');
  var cloneError = document.importNode(errorTemplate.content, true);
  var errorPopup = cloneError.querySelector('.error__message');
  var button = cloneError.querySelector('.error__button');

  var onError = function (message) {
    window.main.appendChild(cloneError);
    button.style.display = 'none';
    errorPopup.textContent = 'Ошибка на сервере: ' + message;
  };

  var onSuccess = function (data) {
    window.myServerData = data;
    window.firstFivePins = window.myServerData.slice(0, 5);
    window.forPopUpBlock = window.firstFivePins[0];
  };

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var dicktServerErrors = {
      'ok': 200,
      'badRequest': 400,
      'unauthorized': 401,
      'notFound': 404
    };

    var error;
    switch (xhr.status) {
      case dicktServerErrors.ok:
        onSuccess(xhr.response);
        break;
      case dicktServerErrors.badRequest:
        error = 'Неверный запрос';
        break;
      case dicktServerErrors.unauthorized:
        error = 'Пользователь не авторизован';
        break;
      case dicktServerErrors.notFound:
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
})();
