//Set default marker icon
var iconImage = '../images/grn_blank.png';
//Declare & intialize contentstring for the infowindows
var contentString = '<p>test line 5</p>';

var mapStyle = [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-17},{"gamma":0.36}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]}];

angular.module('starter.controllers')

.controller('dashCtrl', function($scope, $rootScope, authService, crudService, dataService, $cordovaGeolocation, $ionicLoading, $location, $state) {
  $rootScope.hideNav = false;

  var memberId = authService.getUserID();
  var token = authService.getUserToken();

    // Setup the loader
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

  $scope.pins = dataService.getPins();
  console.log($scope.pins);

  $scope.newPin = function () {
    $state.go('tab.newDrop');
  };

  $scope.initialize = function () {
    // display map
    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false
      };

    //Create a single infowindow object
    var infowindow = new google.maps.InfoWindow({
        content: 'test'
      });

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      $scope.map.setOptions({styles: mapStyle});
      //Wait until the map is loaded
      google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      //Create markers with pins from database
      for (var i = 0; i < $scope.pins.length; i++) {
        var latitude = parseFloat(pins[i].latitude);
        var longitude = parseFloat(pins[i].longitude);
        //Set contentString & marker color based on
        //the state of the pin
        contentString = setPin($scope.pins, i);

        var marker = new google.maps.Marker({
          position: {lat: latitude, lng:longitude},
          map: $scope.map,
          windowContent: contentString,
          icon: iconImage
        });
        //Add event listener for pin clicks
        google.maps.event.addListener(marker, 'click', function () {
              infowindow.setContent(this.windowContent);
              infowindow.open(map, this);
          });
      }

      });
       $ionicLoading.hide();
    }, function(error){
      console.log("Could not get location");
    });
  };
  $scope.initialize();
});

//Determines the color of the pin and html of the infowindow
function setPin (pins, i) {

  if (!pins[i].picked_up && !pins[i].missing) {
    //If not picked up, green
    iconImage = '../images/grn_blank.png';

    return '<div class="content"><h3>'+ pins[i].pin_title + '</h3><p>Dropped by <a><strong>' + pins[i].dropper + '</strong></a> ' + pins[i].drop_time + '</p><a id="pickup" href="#/tab/dash/info/' + pins[i].id + '"><button class="button">More info!</button></a></div>';
  }
  else if (pins[i].missing){
    //Pin is missing, white
    iconImage = '../images/wht_blank.png';

    return '<div class="content"><h3>'+ pins[i].pin_title + '</h3><h4 style="color: red">Missing!</h4><p>Dropped by <a><strong>' + pins[i].dropper + '</strong></a> ' + pins[i].drop_time + '</p><a id="pickup" href="#/tab/dash/info/' + pins[i].id + '"><button class="button">More info!</button></a></div>';
  }
  else {
    //Pin has been picked up, red
    iconImage = '../images/red_blank.png';
    return '<div class="content flip"><h3>'+ pins[i].pin_title + '</h3><h4 style="color: red">Picked up!</h4><div class="dropper"><p>Dropped by <a><strong>' + pins[i].dropper + '</strong></a> ' + pins[i].drop_time + '</p><a id="pickup" href="#/tab/dash/info/' + pins[i].id + '"><button class="button">More info!</button></a></div>';
  }

}
