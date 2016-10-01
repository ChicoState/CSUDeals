angular.module('starter.controllers', [])

/*.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {

	$scope.data = {};

$scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})*/
.controller('LoginCtrl', function($scope, $ionicModal, $ionicPopup, $state, $firebaseAuth, $ionicLoading, $rootScope) {

  var ref = new Firebase($scope.firebaseUrl);
  var auth = $firebaseAuth();


   $ionicModal.fromTemplateUrl('templates/signup.html', {
     scope: $scope
   }).then(function(modal) {
     $scope.modal = modal;
   });
   $ionicModal.fromTemplateUrl('templates/reset-password.html', {
     scope: $scope
   }).then(function(reset) {
     $scope.reset = reset;
   })

   $scope.createUser= function (user) {
     console.log("Create User Function called");
     if (user && user.email && user.password && user.displayname) {
       $ionicLoading.show({
         template: 'Signing Up...'
       });

       firebase.auth().createUserWithEmailAndPassword(
         user.email,
         user.password
       ).then(function (userData) {
         alert("User created successfully!");
         $ionicLoading.hide();
         $scope.modal.hide();
       }).catch(function(error) {
         alert("error: " + error);
         $ionicLoading.hide();
       });
     } else
      alert("Please fill all details");
   }

   $scope.signInWithEmailAndPassword = function (user) {
     if (user.email && user.pwdForLogin) {
       $ionicLoading.show({
         template: 'Signing In...'
       });
       firebase.auth().signInWithEmailAndPassword(
         user.email,
         user.pwdForLogin
       ).then(function (authData) {
         console.log("logged in as:" + authData.uid);
         $ionicLoading.hide();
         $state.go('tab.dash');
       }).catch(function (error) {
         alert("Authentication failed:" + error.message);
         $ionicLoading.hide();
       });
     } else
        alert("Please enter correct email and password");
   }
 })
.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
