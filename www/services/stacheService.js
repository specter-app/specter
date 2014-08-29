(function(){
  'use strict';
  var stacheService = function(Restangular, CachedRestangular, UserService, usSpinnerService, $state, $timeout){
    var self = this;

    this.getAll = function(location){
      return CachedRestangular.all('staches/').customGET("", location).then(function(staches){
        return staches;
      }, function(response){
        return response;
      });
    };

    this.saveStache = function(params) {
      console.log('Saving...');
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
      });
    };

    this.getOne = function(id){
      return Restangular.one('staches/', id).get().then(function(stache){
        return stache;
      }, function(err){
        return err;
      });
    };
    this.selectedStache = '';

   this.randomString = function(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
      return result;
    };

    this.s3Upload = function(newStache) {
        // See status of upload (% complete, public url)
        var status_elem = document.getElementById("status");
        var url_elem = document.getElementById("avatar_url");
        var preview_elem = document.getElementById("preview");
        var save_elem = document.getElementById("save");
        var rString = this.randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

        var s3upload = new S3Upload({
          s3_object_name: rString,
          file_dom_selector: 'files',
          s3_sign_put_url: 'http://specter.azurewebsites.net/staches/sign_s3/',
          onProgress: function(percent, message) {
              preview_elem.innerHTML = '';
              status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
              usSpinnerService.spin('spinner-1');
          },
          onFinishS3Put: function(public_url) {
              status_elem.innerHTML = 'Upload completed. Uploaded to: ' + public_url;
              // Store this url in mongodb
              newStache.aws_url = public_url;
              self.saveStache(newStache);
              usSpinnerService.stop('spinner-1');
              save_elem.innerHTML = "Stache saved!";
              preview_elem.innerHTML = '<img src="' + public_url + '" style="height:45px;border: #455059 4px solid;"/>';
              $timeout(function(){
                $state.go('tab.profile.created');
              }, 3000);
          },
          onError: function(status) {
              status_elem.innerHTML = 'Upload error: ' + status;
              usSpinnerService.stop('spinner-1');
              preview_elem.innerHTML = 'Try again!';
          }
        });
        // $timeout(function(){
        //   $state.go('tab.profile.created');
        // }, 3000);
      };

  };
  stacheService.$inject = ['Restangular', 'CachedRestangular', 'UserService', 'usSpinnerService', '$state', '$timeout'];
  angular.module('specter').service('stacheService', stacheService);
})();


(function(){
angular.module('specter').factory('CachedRestangular', function (Restangular) {
  return Restangular.withConfig(function (RestangularConfigurer) {
    RestangularConfigurer.setDefaultHttpFields({cache: true});
  });
});
})();
