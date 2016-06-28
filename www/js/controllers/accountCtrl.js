angular.module('starter.controllers')

// Profile tab controller
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
