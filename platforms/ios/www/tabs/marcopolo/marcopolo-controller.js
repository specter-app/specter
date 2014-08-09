angular.module('specter.tab.marcopolo.controller', [])
  .controller('marcopoloCtrl', ['$scope', 'geoService', 
    function($scope, geoService) {
      geoService.getLocation().then(function(location) {
        $scope.location = location;
      }, function(err) {
        $scope.location = err;
      });
  }]);