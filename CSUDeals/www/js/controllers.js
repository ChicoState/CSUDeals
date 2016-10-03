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

/*
 This was for adding functionality for when a user forgot their password.
  I couldnt get it to work because firebase sends an email to the user with
  a URL link to reset the email the URL like needs to be to a domain that
we own. furthermore I am not sure how we would get the information
 form the site into our database. There may also be a fundimental flaw in This
 code but I cant test it without the first problem being resolved. -Hannah

   $scope.resetpass= function(pass) {
     console.log("reset password function called");
     if(user.email) {
       ionicLoading.show({
         template: 'Sending email...'
       });
       firebase.auth().sendPasswordResetEmail(
         user.email
       ).then(function (pass) {
         alert("email was sent");
         $ionicLoading.hide();
         $scope.reset.hide();
       }).catch(function (error) {
         alert("error: " + error);
         $ionicLoading.hide();
       });
     } else {
       alert ("please enter your email");
     }
   }
*/

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


.controller('DashCtrl', function($scope, $ionicModal, $ionicLoading, Chats, $firebaseArray) {
  $ionicModal.fromTemplateUrl('templates/add-business.html', {
    scope: $scope
  }).then(function(add) {
    $scope.add = add;
  })

var ref = new Firebase($scope.firebaseUrl + "/buisnesses");
//this code adds to ourdatabase
 $scope.addBusiness = function(business) {
   if(business.logo && business.address && business.hours) {
     $ionicLoading.show({
       template: "processing information"
     });
    ref.push({
       name : business.logo,
       url : business.url,
       address: business.address,
       hours: business.hours
     }, function(error) {
       if (error) {
         alert("Storing Business data failed" + error.message);
         $ionicLoading.hide();
       } else {
         console.log("added business information to database");
         $ionicLoading.hide();
         $scope.add.hide();
         alert("business added successfully");
       }
     });
   } else
     alert("Please fill all details with * ")
 }

//this code reads from database and puts information into an array
  $scope.businesses = [];
 ref.on('child_added', function(snapshot, prevChildKey) {
   var newPost = snapshot.val();
   var business = {
     name: newPost.name,
     url:  newPost.url,
     address: newPost.address,
     hours: newPost.hours
   };
   $scope.businesses.push(business);
   });


})

.controller('ChatsCtrl', function($scope, Chats, $firebaseAuth, $ionicLoading) {
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
