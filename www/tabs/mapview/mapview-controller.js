angular.module('specter.tab.mapview.controller', ['restangular'])
.controller('mapviewCtrl', function($scope, Restangular) {
  // var Stache = Restangular.one('staches', 53e194234b1f8a123b8fd2f4)
  // Restangular.one('staches', '53e194234b1f8a123b8fd2f4').get().then(function(stache){
  //   $scope.allStaches = stache;
  //   console.log(stache)
  // });
  // console.log($scope.allStaches);
  Restangular.all('staches').getList().then(function(staches){
    console.log(staches);
  })
});
  
