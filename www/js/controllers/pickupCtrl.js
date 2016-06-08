angular.module('starter.controllers')

.controller('pickupCtrl', function($scope, $stateParams, $state, dataService, authService) {
  var memberId = authService.getUserID();
  var username = authService.getUserName();
  console.log("pinid"+ $stateParams.pin_id);
  $scope.pin = dataService.getPin($stateParams.pin_id);
  console.log($scope.pin);
  $scope.pin.receiver_message = 'We had so much fun thank you!';
  $scope.pin.receiver_image = '../images/uploads/bunnies_found.jpg';

  $scope.pickup = function () {

    $scope.pin.receiver_id = memberId;
    $scope.pin.receiver = username;
    $scope.pin.picked_up = true;
    $scope.pin.pick_up_time = '1 minute ago';

    dataService.editPin($scope.pin);
    $state.go('tab.dash');
  };
});
