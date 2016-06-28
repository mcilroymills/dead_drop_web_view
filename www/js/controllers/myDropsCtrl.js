angular.module('starter.controllers')

// controller for My Drops tab
.controller('myDropsCtrl', function($scope, $rootScope, $stateParams, dataService, authService, crudService) {
  $rootScope.hideNav = false;
  var memberId = JSON.parse(authService.getUserID());
  $scope.drops = dataService.getDropsByUser(memberId);

});
