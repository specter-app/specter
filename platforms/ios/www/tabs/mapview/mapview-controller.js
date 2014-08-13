angular.module('specter.tab.mapview.controller', [])
.controller('mapviewCtrl', ['stacheService', function(stacheService) {
  var self = this;
  stacheService.getAll().then(function(staches) {
    self.staches = staches;
  self.redirect = function(id){
    stacheService.getOne(id).then(function(stache){
      // console.log(stache)
      // href="#/tab/marcopolo/:{{stache._id}}"
    }, function(err){
      return err
    })
  }

  });
}]);
