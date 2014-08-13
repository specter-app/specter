(function(){
  'use strict';

  var stacheService = function(Restangular){
    this.getAll = function(){
      //http://specter.azurewebsites.net/staches/?coord=-122.4089+37.7837+10000000
      // return Restangular.all('staches/').customGET("",{coord: "-122.4089+37.7837+10000000"}).then(function(staches){
      //   // stacheService.staches = staches;
      //   return staches;
      // }, function(response){
      //   // return ('error with status', response);
      // });
      return Restangular.all('staches/').customGET("",{lat: 37.7837, lon: -122.4089, dist: 1000000}).then(function(staches){
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
