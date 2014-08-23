
angular.module('specter', ['ionic', 'specter.tab', 'restangular', 'ngCordova', 'google-maps', 'marcopoloDirective', 'firebase', 'ngProgress'])
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
    var logInRequired = next.data.logInRequired;
    var loggedIn = UserService.isLogged;
    if (!loggedIn && logInRequired) {
       event.preventDefault();
       $rootScope.$emit('$showPopup');
    }
  });
  geoService.getLocation().then(function(location){
    var params = {
      lat: location.coords.latitude,
      lon: location.coords.longitude,
      dist: 1000000000000
    };
    stacheService.getAll(params).then(function(staches) {
      stacheService.selectedStache = staches[0]._id;
    });
  });

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
