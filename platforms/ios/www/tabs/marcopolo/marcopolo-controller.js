angular.module('specter.tab.marcopolo.controller', [])
  .controller('marcopoloCtrl', ['geoService', '$cordovaGeolocation', '$scope', '$timeout',
    function(geoService, $cordovaGeolocation, $scope, $timeout) {
      var self = this;
      self.location = {long: "", lat: ""};
      $scope.map = {
        center: {
            latitude: 37.7837,
            longitude: -122.4089
        },
        zoom: 15
      };
      geoService.getLocation().then(function(position) {
        self.location.long = position.coords.longitude;
        self.location.lat = position.coords.latitude;
      }, function(err) {
        self.location = err;
      });
      var watch = $cordovaGeolocation.watchPosition({
        frequency: 1000
      });
      watch.promise.then(function() {
          // Not currently used
        }, function(err) {
          self.location = err
        }, function(position) {
      self.location.long = position.coords.longitude;
      self.location.lat = position.coords.latitude;
      });
  }]);
