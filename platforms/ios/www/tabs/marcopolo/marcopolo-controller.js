angular.module('specter.tab.marcopolo.controller', [])
  .controller('marcopoloCtrl', ['geoService', '$cordovaGeolocation', '$scope', 'location',
    function(geoService, $cordovaGeolocation, $scope, location) {
      var self = this;
      self.location = {long: "", lat: ""};
      // geoService.getLocation().then(function(position) {
      //   self.location.long = position.coords.longitude;
      //   self.location.lat = position.coords.latitude;
      // }, function(err) {
      //   self.location = err;
      // });
      self.location.long = location.coords.longitude;
      self.location.lat = location.coords.latitude;
      $scope.map = {
        center: {
            latitude: self.location.lat,
            longitude: self.location.long
        },
        zoom: 15
      };
      var watch = $cordovaGeolocation.watchPosition({
        frequency: 10000
      });
      watch.promise.then(function() {
          // Not currently used
        }, function(err) {
          self.location = err;
        }, function(position) {
      self.location.long = position.coords.longitude;
      self.location.lat = position.coords.latitude;
      self.distance = geoService.calculateDistance(-122.27013, 37.87487, self.location.long, self.location.lat)
      });

  }]);
