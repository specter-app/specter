angular.module('specter.tab.mapview.controller', [])
.controller('mapviewCtrl', [
  'stacheService',
  'geoService',
  'location',
  '$scope',
  '$rootScope',
  '$timeout',
  '$ionicPopup',
  '$state',
  function(stacheService, geoService, location, $scope, $rootScope, $timeout, $ionicPopup, $state) {
    var self = this;
    var params = {
      lat: location.coords.latitude,
      lon: location.coords.longitude,
      dist: 1000000000000
    };
    stacheService.getAll(params).then(function(staches) {
      self.staches = staches;
    });
    self.redirect = function(id){
      stacheService.selectedStache = id;
      $state.go('tab.marcopolo')
    }
}]);
