angular.module('specter.tab.mapview.controller', [])
.controller('mapviewCtrl', ['$scope', 'stacheService', function($scope, stacheService) {
  stacheService.getAll().then(function(staches) {
    $scope.staches = staches;
  });
}]);
