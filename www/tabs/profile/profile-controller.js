angular.module('specter.tab.profile.controller', [])
.controller("profileCtrl", function(stacheService, $scope, UserService, $rootScope, $state, $rootScope) {
  $rootScope.$on("$firebaseSimpleLogin:login", function(event, user) {
    stacheService.getUserStaches(UserService.uid).then(function(staches){
      $scope.staches_discovered = staches.staches_discovered;
      $scope.staches_created = staches.staches_created;
      console.log($scope.staches_discovered, "discovered")
      console.log($scope.staches_created, "created")
    })
  });
  $rootScope.$on('$stateChangeStart', function (event, next) {
    if ($state.current.url === '/discovered' || $state.current.url === '/created'){
      stacheService.getUserStaches(UserService.uid).then(function(staches){
        $scope.staches_discovered = staches.staches_discovered;
        $scope.staches_created = staches.staches_created;
      });
    };
  });
});
