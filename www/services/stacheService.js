(function(){
  'use strict';

  var stacheService = function(Restangular){
    this.getAll = function(location){
      return Restangular.all('staches/').customGET("", location).then(function(staches){
        return staches;
      }, function(response){
        return response;
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

    this.getOne = function(id){
      return Restangular.one('staches/', id).get().then(function(stache){
        return stache;
      }, function(err){
        return err;
      });
    };
  };
  angular.module('specter').service('stacheService', [
    'Restangular',
    stacheService
  ]);
})();
