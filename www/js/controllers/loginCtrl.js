angular.module('starter.controllers')

.controller('loginCtrl', function($rootScope, $scope, $location, authService) {
  $rootScope.hideNav = true;
  $scope.user = {};
  $scope.login = function() {
    authService.login($scope.user)
      .then(function(user) {
        console.log("user after login", user);
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
