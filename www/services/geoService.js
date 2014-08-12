(function() {
  'use strict';
  var geoService = function($cordovaGeolocation) {
    this.getLocation = function() {
      return $cordovaGeolocation.getCurrentPosition().then(function(position) {
            return position;
          }, function(err) {
            return err;
          });
    };
  };
  angular.module('specter').service('geoService', [
    '$cordovaGeolocation',
    geoService
  ]);
})();
