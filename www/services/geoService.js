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
    this.calculateDistance = function(currentStache, currentLocation){
      var from = new google.maps.LatLng(currentStache.loc[1], currentStache.loc[0]);
      var to = new google.maps.LatLng(currentLocation.lat, currentLocation.long);
      var dist = google.maps.geometry.spherical.computeDistanceBetween(from, to);
      return dist;
    };
  };
   geoService.$inject = ['$cordovaGeolocation'];
  angular.module('specter').service('geoService', geoService);
})();
