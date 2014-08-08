(function() {
  'use strict';
  var geoService = function($cordovaGeolocation) {
    this.getLocation = function() {
      return $cordovaGeolocation.getCurrentPosition().then(function(position) {
            // Position here: position.coords.latitude, position.coords.longitude
            return position;
          }, function(err) {
            // error
            return err;
          });

        // var watch = $cordovaGeolocation.watchPosition({
        //   frequency: 1000
        // });

        // watch.promise.then(function() {
        //     // Not currently used
        //   }, function(err) {
        //     // An error occured. Show a message to the user
        //   }, function(position) {
        //     // Active updates of the position here
        //     // position.coords.latitude/longitude
        // });
    };
  };
  
  angular.module('specter').service('geoService', [
    '$cordovaGeolocation',
    geoService 
  ]);
})();