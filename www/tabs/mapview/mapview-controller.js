angular.module('specter.tab.mapview.controller', [])
.controller('mapviewCtrl', ['stacheService', function(stacheService) {
  var self = this;
  stacheService.getAll().then(function(staches) {
    self.staches = staches;
  });
}]);
