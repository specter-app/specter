angular.module('specter.tab.marcopolo.controller', [])
  .controller('marcopoloCtrl', ['$scope', 'geoService', '$cordovaGeolocation',
    function($scope, geoService, $cordovaGeolocation) {
      $scope.location = {long: "", lat: ""}
      $scope.map = {
        center: {
            latitude: 37.7837,
            longitude: -122.4089
        },
        zoom: 15
      };
      geoService.getLocation().then(function(position) {
        $scope.location.long = position.coords.latitude;
        $scope.location.lat = position.coords.longitude;
      }, function(err) {
        $scope.location = err;

      });
      var watch = $cordovaGeolocation.watchPosition({
        frequency: 1000
      });
      watch.promise.then(function() {
          // Not currently used
        }, function(err) {
          $scope.location = err
        }, function(position) {
      $scope.location.long = position.coords.latitude;
      $scope.location.lat = position.coords.longitude;
      });
  }]);
