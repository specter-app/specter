angular.module('specter.tab.profile.controller', [])
.controller("profileCtrl", function(stacheService, $scope, UserService, $rootScope) {
  $rootScope.$on("$firebaseSimpleLogin:login", function(event, user) {
    console.log(UserService.uid);
    stacheService.getUserStaches(UserService.uid).then(function(staches){
      console.log(staches);
    })
  });
});
