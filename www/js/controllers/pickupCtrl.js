// This is the controller for the pick-up page
angular.module('starter.controllers')
.controller('pickupCtrl', function($scope, $stateParams, $state, dataService, authService) {

  var memberId = authService.getUserID();
  var username = authService.getUserName();

  $scope.pin = dataService.getPin($stateParams.pin_id);
  $scope.pin.receiver_message = 'I\'ve been looking all over for this!';
  $scope.pin.receiver_image = '../images/uploads/waddums.PNG';

  $scope.pickup = function () {

    $scope.pin.receiver_id = memberId;
    $scope.pin.receiver = username;
    $scope.pin.picked_up = true;
    $scope.pin.pick_up_time = '1 minute ago';
    dataService.editPin($scope.pin);

    // Redirect back to dashboard page after POST
    $state.go('tab.dash');
  };
});
