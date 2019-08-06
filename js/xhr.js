'use strict';

window.makeXhr = function () {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
  xhr.send();
};
