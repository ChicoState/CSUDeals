angular.module('starter.services', ['firebase'])
.factory("Auth", ["$firebaseAuth", "$rootScope",
function ($firebaseAuth, $rootScope) {
    var ref = new Firebase(firebaseUrl);
    return $firebaseAuth();
}])
.factory("Buisness", ["$firebaseDatabase", "$rootScope",
function($firebaseDatabase, rootScope) {
    var BuisnessRef = new Firebase(firebaseUrl);
    return $firebaseDatabase();
}])



.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'The Bear',
    lastText: 'Bear Burgers 1/2 Price Until 5PM!',
    face: 'img/default-avatar.jpg'
  }, {
    id: 1,
    name: 'Sierra Nevada',
    lastText: 'Free Beer w/ Entree Purchase Today Only!',
    face: 'img/default-avatar.jpg'
  }, {
    id: 2,
    name: 'Riley\'s',
    lastText: 'Well Drinks $0.50 Each 8PM-9PM Today!',
    face: 'img/default-avatar.jpg'
  }, {
    id: 3,
    name: 'Chipotle',
    lastText: 'Burritos BOGO After 5PM Today!',
    face: 'img/default-avatar.jpg'
  }, {
    id: 4,
    name: 'Burgers & Brew',
    lastText: 'Happy Hour All Day Today!',
    face: 'img/default-avatar.jpg'
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




/*.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (name == 'legion' && pw == 'wearemany') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})*/
