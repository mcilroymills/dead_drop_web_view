// login page controller
angular.module('starter.controllers')
.controller('loginCtrl', function($rootScope, $scope, $location, authService) {

  // hide nav bar on login page
  $rootScope.hideNav = true;
  $scope.user = {};

  $scope.login = function() {
    authService.login($scope.user)
      .then(function(user) {
        authService.setUserInfo(user);
        $rootScope.currentUser = {
          name: authService.getUserName(),
          id: authService.getUserID()
        };
        //Then redirect user to dashboard after succesful login
        $location.path('/tab/dash');
      })
      .catch(function(err) {
        // check status code, send appropriate message
        console.log(err);
      });
  };
  // so demo users dont have to create an account to demo the app
  $scope.loginAsGuest = function() {
    var guestUser = {
      email: "millsmcilroy@gmail.com",
      password: "test"
    };
    $scope.user = guestUser;

    authService.login(guestUser)
      .then(function(user) {
        authService.setUserInfo(user);
        //Then redirect user to dashboard after succesful login

        $rootScope.currentUser = {
          name: authService.getUserName(),
          id: authService.getUserID()
        };
        $location.path('/tab/dash');
      })
      .catch(function(err) {
        // check status code, send appropriate message
        console.log(err);
      });
    };
});
