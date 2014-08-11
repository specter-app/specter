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

    this.saveStache = function(params) {
      var staches = Restangular.all('staches');
      var newStache = {
        title: params.title,
        author: 'cool mitch',
        lon: params.lon,
        lat: params.lat,
        content: params.content,
        locked: false,
        clue: '',
        password: null,
        tags: params.tags
      };
      console.log('saving', newStache);
      staches.post(newStache);
    };

  };
  angular.module('specter').service('stacheService', [
    'Restangular',
    stacheService
  ]);
})();
