angular.module('specter.tab.mapview.controller', [])
.controller('mapviewCtrl', ['stacheService', function(stacheService) {
  stacheService.getAll().then(function(staches) {
    this.staches = staches;
  });
}]);
