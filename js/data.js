'use strict';

(function () {
  var objectsArray = [];
  window.getRandomNumber = function (min, max) {
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

  window.dataPins = function () {
    for (var i = 0; i < window.PINNUMBER; i++) {
      objectsArray.push({
        'author': {
          avatar: './img/avatars/user0' + numbArrays[i] + '.png',
        },
        'offer': {
          type: (window.getRandomType(1, 4)),
        },
        'location': {
          x: window.getRandomNumber(0, 750),
          y: window.getRandomNumber(130, 630)
        }
      });
    }
    return (objectsArray);
  };
})();
