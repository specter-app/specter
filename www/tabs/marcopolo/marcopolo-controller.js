angular.module('specter.tab.marcopolo.controller', [])
  .controller('marcopoloCtrl', ['$scope', 'geoService',
    function($scope, geoService) {
      $scope.map = {
        center: {
            latitude: 37.7837,
            longitude: -122.4089
        },
        zoom: 15
      };
      geoService.getLocation().then(function(location) {
        $scope.location = location;
      }, function(err) {
        $scope.location = err;
      });
  }]);