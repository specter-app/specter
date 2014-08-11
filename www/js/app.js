// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('specter', ['ionic', 'specter.tab', 'restangular', 'ngCordova', 'google-maps', 'marcopoloDirective'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://specter.azurewebsites.net/');
  // RestangularProvider.setDefaultHeaders({
  //   "Content-Type": "application/json",
  //   "X-Requested-With": "XMLHttpRequest"
  // });
});
