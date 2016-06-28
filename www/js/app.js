// This file contains the module declarations and routes

// 'starter' is the name of this angular module (also set in a <body> attribute in index.html)
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// These are the "routes"
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $stateProvider

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

  .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'registerCtrl'
    })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // dashboard
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'dashCtrl'
      }
    }
  })

  //individual pin info page
  .state('tab.info', {
    url: '/dash/info/:pin_id',
    views: {
      'tab-dash': {
        templateUrl: 'templates/info.html',
        controller: 'infoCtrl'
      }
    }
  })

  // pickup pin page
  .state('tab.pickup', {
    url: '/dash/pickup/:pin_id',
    views: {
      'tab-dash': {
        templateUrl: 'templates/pickup.html',
        controller: 'pickupCtrl'
      }
    }
  })

  // new drop page
  .state('tab.newDrop', {
    url: '/dash/new',
    views: {
      'tab-dash': {
        templateUrl: 'templates/newDrop.html',
        controller: 'newDropCtrl'
      }
    }
  })

  // My Drops tab
  .state('tab.mydrops', {
      url: '/mydrops',
      views: {
        'tab-mydrops': {
          templateUrl: 'templates/tab-mydrops.html',
          controller: 'myDropsCtrl'
        }
      }
    })

  // Profile tab
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

//Declare starter.controllers module
angular.module('starter.controllers', []);
