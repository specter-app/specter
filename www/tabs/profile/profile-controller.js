angular.module('specter.tab.profile.controller', [])
.controller("profileCtrl", function(stacheService, $scope, UserService, $rootScope) {
  $rootScope.$on("$firebaseSimpleLogin:login", function(event, user) {
    console.log(UserService.uid);
    stacheService.getUserStaches(UserService.uid).then(function(staches){

      $scope.staches_discovered = staches.staches_discovered;
      $scope.staches_created = staches.staches_created;
      console.log($scope.staches_discovered, "discovered")
      console.log($scope.staches_created, "discovered")
    })
  });
});
