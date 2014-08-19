angular.module('specter.tab.profile.controller', [])
.controller("loginCtrl", function($scope, $rootScope, $firebase, $firebaseSimpleLogin, UserService) {
  // Get a reference to the Firebase
  var firebaseRef = new Firebase("https://specter-app.firebaseio.com/");
  // Create a Firebase Simple Login object
  $scope.auth = $firebaseSimpleLogin(firebaseRef);
  // Initially set no user to be logged in
  $scope.user = UserService;
  // Logs a user in with inputted provider
  $scope.login = function(provider) {
    $scope.auth.$login(provider);
    console.log($scope.user);
  };
  // Logs a user out
  $scope.logout = function() {
    $scope.auth.$logout();
  };
  // Upon successful login, set the user object
  $rootScope.$on("$firebaseSimpleLogin:login", function(event, user) {
    UserService.uid = user.uid;
    UserService.isLogged = true;
    UserService.username = user.displayName;
    UserService.pic = user.thirdPartyUserData.picture.data.url;
  });
  // Upon successful logout, reset the user object
  $rootScope.$on("$firebaseSimpleLogin:logout", function(event) {
    UserService.uid = 0;
    UserService.isLogged = false;
    UserService.username = "";
    UserService.pic = "";
    // window.cookies.clear(function() {
    //   console.log("Cookies cleared!");
    // });
  });
  // Log any login-related errors to the console
  $rootScope.$on("$firebaseSimpleLogin:error", function(event, error) {
    console.log("Error logging user in: ", error);
  });
});
