(function(){
  'use strict';

  angular.module('specter').factory('UserService', function($rootScope){
    var sdo = {
      uid: 0,
		  isLogged: false,
		  username: '',
      pic: ''
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
      // window.cookies.clear(function() {
      //   console.log("Cookies cleared!");
      // });
    });
    // Log any login-related errors to the console
    $rootScope.$on("$firebaseSimpleLogin:error", function(event, error) {
      console.log("Error logging user in: ", error);
    });
	  return sdo;
  });
})();
