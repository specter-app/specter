angular.module('specter.tab.marcopolo.controller', [])
  .controller('marcopoloCtrl', ['$scope', 'geoService',
    function($scope, geoService) {
      $scope.map = {
        center: {
            latitude: 45,
            longitude: -73
        },
        zoom: 8
      };
      geoService.getLocation().then(function(location) {
        $scope.location = location;
      }, function(err) {
        $scope.location = err;
      });
  }]);