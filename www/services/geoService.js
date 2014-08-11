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
    };
  };
  angular.module('specter').service('geoService', [
    '$cordovaGeolocation',
    geoService
  ]);
})();
