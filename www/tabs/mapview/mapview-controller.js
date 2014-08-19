angular.module('specter.tab.mapview.controller', [])
.controller('mapviewCtrl', [
  'stacheService',
  'geoService',
  'location',
  function(stacheService, geoService, location) {
    var self = this;
    stacheService.getAll({lat: location.coords.latitude, lon: location.coords.longitude, dist: 1000000}).then(function(staches) {
      self.staches = staches;
      console.log(staches);
    });
}]);
