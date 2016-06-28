/** GLOBAL VARIABLES FOR MAP **/
// Set default marker icon
var iconImage = '../images/grn_blank.png';
// Declare & intialize contentstring for the infowindows
var contentString = '<p>test line 5</p>';
// "Retro" map skin [colors: teal: #84afa3 (water), gray-blue #3f518c (transit lines), mustard #B09010 (highways)]
var mapStyle = [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-17},{"gamma":0.36}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]}];

// Controller for new drop page
angular.module('starter.controllers')
.controller('newDropCtrl', function($scope, authService, crudService, dataService, $cordovaGeolocation, $ionicLoading, $state) {

  var memberId = authService.getUserID();
  var token = authService.getUserToken();
  var username = authService.getUserName();

  // Setup the loader
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    Width: 200,
    showDelay: 0
  });

  //Hardcode data for presentation mode
  $scope.pin = {
    pin_title: "Stapler",
    pin_description: "Swingline Deluxe",
    pin_image: '../../images/uploads/swingline.jpg',
  };

  $scope.placeDrop = function () {

    //Set default properties for new pin
    $scope.pin.active = true;
    $scope.pin.missing = false;
    $scope.pin.picked_up = false;
    $scope.pin.dropper_id = memberId;
    $scope.pin.receiver_id = null;
    $scope.pin.receiver_message = null;
    $scope.pin.receiver = null;
    $scope.pin.drop_time = '1 minute ago';
    $scope.pin.dropper = JSON.parse(username);

    dataService.newPin($scope.pin);
    $state.go('tab.dash');

  };

  $scope.newInitialize = function () {
    // display map
    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    $scope.pin.latitude = position.coords.latitude;
    $scope.pin.longitude = position.coords.longitude;

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false
    };

    $scope.newMap = new google.maps.Map(document.getElementById("newMap"), mapOptions);

    $scope.newMap.setOptions({styles: mapStyle});
    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.newMap, 'idle', function(){
      var marker = new google.maps.Marker({
        position: latLng,
        map: $scope.newMap,
        icon: '../images/grn_blank.png'
      });
    });
    $ionicLoading.hide();

    }, function(error){
      console.log("Could not get location");
    });
  };
  // initialize the map
  $scope.newInitialize();
});
