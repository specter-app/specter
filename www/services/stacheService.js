(function(){
  'use strict';
  var stacheService = function(Restangular, CachedRestangular, UserService){
    this.getAll = function(location){
      return CachedRestangular.all('staches/').customGET("", location).then(function(staches){
        return staches;
      }, function(response){
        return response;
      });
    };

    this.saveStache = function(params) {
      var staches = Restangular.all('staches');
      var newStache = {
        title: params.title,
        created_by: UserService.uid,
        lon: params.lon,
        lat: params.lat,
        content: params.content,
        aws_url: params.aws_url,
        locked: false,
        clue: params.clue,
        password: null,
        tags: params.tags
      };
      console.log('saving', newStache);
      var savedStache = staches.post(newStache);
      return savedStache;
    };

    this.getUserStaches = function(facebookid){
      return Restangular.one('users/login', facebookid).get().then(function(staches){
        return staches;
      }, function(err){
        return err;
      })
    };

    this.getOne = function(id){
      return Restangular.one('staches/', id).get().then(function(stache){
        return stache;
      }, function(err){
        return err;
      });
    };
    this.selectedStache = '';
  };
  stacheService.$inject = ['Restangular', 'CachedRestangular', 'UserService'];
  angular.module('specter').service('stacheService', stacheService);
})();


(function(){
angular.module('specter').factory('CachedRestangular', function (Restangular) {
  return Restangular.withConfig(function (RestangularConfigurer) {
    RestangularConfigurer.setDefaultHttpFields({cache: true});
  });
});
})();
