angular.module('specter.tab.mapview.controller', [])
.controller('mapviewCtrl', ['stacheService', function(stacheService) {
  var self = this;
  stacheService.getAll().then(function(staches) {
    self.staches = staches;
    // console.log(self.staches);
  self.redirect = function(id){
    stacheService.getOne(id).then(function(stache){
      console.log(stache)
    }, function(err){
      return err
    })
  }
  // stacheService.getOne('53e95b608b480cd4103720fc').then(function(stache){
  // })
  });
}]);
