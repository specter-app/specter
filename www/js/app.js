// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('specter', ['ionic', 'specter.tab', 'restangular', 'ngCordova', 'google-maps', 'marcopoloDirective', 'firebase'])
.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://specter.azurewebsites.net/');
  RestangularProvider.setDefaultHeaders({
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  });
})
.run(function($ionicPlatform, UserService, $rootScope, stacheService, geoService) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  $rootScope.$on('$stateChangeStart', function (event, next) {
    var logInRequired = next.data.logInRequiredg
    // $rootScope.next = next;
    var loggedIn = UserService.isLogged;
    if (!loggedIn && logInRequired) {
       event.preventDefault();
       $rootScope.$emit('$showPopup');
    }
  });
  //in order to call get all, i need to call geoService,
  geoService.getLocation().then(function(location){
    var params = {
      lat: location.coords.latitude,
      lon: location.coords.longitude,
      dist: 1000000000000
    };
  stacheService.getAll(params).then(function(staches) {
    stacheService.selectedStache = staches[0]._id
  });
  });
  //after that i can pass in the params and then call stacheService

})
.filter('distance', function() {
  return function(distance) {
    if (distance === undefined) {
      return "Generating ectoplasm...";
    } else if (distance >= 1000) {
      distance *= 0.000621371192;
      return distance.toFixed(2) + " miles";
    } else {
      return distance.toFixed(0) + " meters";
    }
  };
});
