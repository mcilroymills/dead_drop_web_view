angular.module('starter.controllers')

.controller('infoCtrl', function($scope, $stateParams, dataService) {
  console.log("stateparms in infoCtrl", $stateParams.pin_id);
  $scope.pin = dataService.getPin($stateParams.pin_id);
});
