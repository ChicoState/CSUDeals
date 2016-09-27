angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'The Bear',
    lastText: 'Bear Burgers 1/2 Price Until 5PM!',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Sierra Nevada',
    lastText: 'Free Beer w/ Entree Purchase Today Only!',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Riley\'s',
    lastText: 'Well Drinks $0.50 Each 8PM-9PM Today!',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Chipotle',
    lastText: 'Burritos BOGO After 5PM Today!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Burgers & Brew',
    lastText: 'Happy Hour All Day Today!',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
