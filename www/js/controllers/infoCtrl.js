angular.module('starter.controllers')

.controller('infoCtrl', function($scope, $stateParams, dataService) {
  
  $scope.pin = dataService.getPin($stateParams.pin_id);
});
