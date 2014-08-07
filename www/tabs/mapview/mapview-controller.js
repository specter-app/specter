angular.module('specter.tab.mapview.controller', [])
.controller('mapviewCtrl', ['$scope', 'mapviewService', function($scope, mapviewService) {
  $scope.staches = mapviewService.getAll();
}]);
