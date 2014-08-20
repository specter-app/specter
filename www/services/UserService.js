(function(){
  'use strict';
  angular.module('specter').factory('UserService', function($rootScope, Restangular){
    var sdo = {
      uid: 0,
		  isLogged: false,
		  username: '',
      pic: ''
    };
    sdo.login = function(facebookid){
      return Restangular.one('users/login', facebookid).get().then(function(staches){
        return staches;
      }, function(response){
        return response;
      });
    };
    // Upon successful login, set the user object
    $rootScope.$on("$firebaseSimpleLogin:login", function(event, user) {
      sdo.uid = user.uid;
      sdo.isLogged = true;
      sdo.username = user.displayName;
      sdo.pic = user.thirdPartyUserData.picture.data.url;
    });
    // Upon successful logout, reset the user object
    $rootScope.$on("$firebaseSimpleLogin:logout", function(event) {
      sdo.uid = 0;
      sdo.isLogged = false;
      sdo.username = "";
      sdo.pic = "";
    });
    // Log any login-related errors to the console
    $rootScope.$on("$firebaseSimpleLogin:error", function(event, error) {
      console.log("Error logging user in: ", error);
    });
	  return sdo;
  });
})();
