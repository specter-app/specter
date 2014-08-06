angular.module('specter.tab.mapview.controller', ['restangular'])
.controller('mapviewCtrl', function($http, Restangular, $scope) {
  var staches = Restangular.all('staches');
  staches.getList().then(function(staches){
    $scope.staches = staches;
    console.log(staches)
  }, function(response){
    console.log('error with status', response)
  })
  
});
