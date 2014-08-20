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
      var from = new google.maps.LatLng(lat1, lon1);
      var to = new google.maps.LatLng(lat2, lon2);
      var dist = google.maps.geometry.spherical.computeDistanceBetween(from, to);
      return dist;
    };
  };
  angular.module('specter').service('geoService', [
    '$cordovaGeolocation',
    geoService
  ]);
})();
