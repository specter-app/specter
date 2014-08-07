(function(){
  'use strict';
  var mapviewService = function(Restangular){
    this.getAll = function(){
      return Restangular.all('staches').getList().then(function(staches){
        return staches;
      }, function(response){
        return ('error with status', response);
      });
    }
  };
  angular.module('specter').service('mapviewService', [
    'Restangular',
    mapviewService
  ]);
})();
