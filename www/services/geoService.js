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
    this.calculateDistance = function(lon1, lat1, lon2, lat2){
      var from = new google.maps.LatLng(lon1, lat1);
      var to = new google.maps.LatLng(lon2, lat2);
      dist = google.maps.geometry.spherical.computeDistanceBetween(from, to) * 0.000621371192;
        return dist = dist - dist % 0.001;
    };
  };
  angular.module('specter').service('geoService', [
    '$cordovaGeolocation',
    geoService
  ]);
})();
