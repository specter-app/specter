angular.module('specter.tab.mapview.controller', ['restangular'])
.controller('mapviewCtrl', function($http, Restangular, $scope) {
  // $http.get('http://localhost:8000/staches')
  //   .success(function(data){
  //     console.log(data);
  //   })
  //   .error(function(msg){
  //     console.log(msg);
  //   })

  var staches = Restangular.all('staches');
  staches.getList().then(function(staches){
    $scope.staches = staches;
    console.log(staches)
  }, function(response){
    console.log('error with status', response)
  })
//   Restangular.all('staches').getList()
//     .then(function(stache) {
//       console.log(stache);
//       $scope.stache = stache;
//     }).catch(function(err) {
//       console.log('fuck')
//       console.log(err)
//     });
  // Restangular.all('staches').getList()
  //   .then(function(staches) {
  //
  //   });
});
