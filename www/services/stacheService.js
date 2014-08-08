(function(){
  'use strict';
  var stacheService = function(Restangular){
    this.getAll = function(){
      return Restangular.all('staches').getList().then(function(staches){
        // stacheService.staches = staches;
        return staches;
      }, function(response){
        // return ('error with status', response);
      });
    };
  };
  angular.module('specter').service('stacheService', [
    'Restangular',
    stacheService
  ]);
})();
