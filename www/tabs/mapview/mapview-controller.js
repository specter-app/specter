(function(){
  var mapviewCtrl = function(stacheService, location, $state) {
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
        $state.go('tab.marcopolo');
      }
  };
  mapviewCtrl.$inject = ['stacheService', 'location', '$state'];
  angular.module('specter.tab.mapview.controller', []).controller('mapviewCtrl', mapviewCtrl);
})();
