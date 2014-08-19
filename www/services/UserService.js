(function(){
  'use strict';

  angular.module('specter').factory('UserService', [function(){
    var sdo = {
      uid: 0,
		  isLogged: false,
		  username: '',
      pic: ''
	  };
	  return sdo;
  }]);
})();
