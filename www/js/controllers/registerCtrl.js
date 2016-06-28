angular.module('starter.controllers')
.controller('registerCtrl', function($rootScope, $scope, $location, authService) {
    $scope.user = {};
    $scope.register = function() {
      authService.register($scope.user)
        .then(function(user) {
          authService.setUserInfo(user);
          $rootScope.currentUser = authService.getUserInfo();
          $location.path('/dash');
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

    authService.login(guestUser)
      .then(function(user) {
        authService.setUserInfo(user);
        //Then redirect user to dashboard after succesful login
        $location.path('/dashboard');
        $rootScope.currentUser = {
          name: authService.getUserName(),
          id: authService.getUserID()
        };
      })
      .catch(function(err) {
        // check status code, send appropriate message
        console.log(err);
      });
  };
});
