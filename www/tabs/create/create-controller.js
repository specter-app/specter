(function(){
    var createCtrl = function($ionicActionSheet, $ionicPopup, Restangular, cameraService,
      stacheService, $cordovaCapture, $cordovaGeolocation, geoService, $ionicModal, $scope) {
      var self = this;
      this.data = {
        currentTags: {}
      };
      this.location = {
        long: "",
        lat: ""
      };

      this.show = function() {
        var hideSheet = $ionicActionSheet.show({
          buttons: [{
            text: 'Funny'
          }, {
            text: 'Puzzle'
          }, {
            text: 'Event'
          }, {
            text: 'Add a tag...'
          }],
          addText: 'Add a tag',
          cancelText: 'Done',
          cancel: function() {
            // add cancel code..
          },
          buttonClicked: function(index, data) {
            if (index === 3) {
              self.showTagsPopup();
            } else {
              self.data.currentTags[data.text] = true;
            }
          }
        });
      };

      this.showTagsPopup = function() {
        var myPopup = $ionicPopup.show({
          template: '<input type="text" ng-model="create.data.newTag">',
          title: 'Enter a new tag',
          scope: $scope,
          buttons: [{
            text: 'Cancel'
          }, {
            text: '<b>Save tag</b>',
            type: 'button-positive',
            onTap: function(e) {
              self.data.currentTags[self.data.newTag] = true;
              self.data.newTag = '';
            }
          }, ]
        });
        myPopup.then(function(res) {
        });
      };

      this.showTextPopup = function() {
        var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="create.data.textContent">',
            title: 'Enter text content',
            scope: $scope,
            buttons: [{
            text: 'Cancel'
          }, {
            text: '<b>Save text</b>',
            type: 'button-positive',
            onTap: function(e) {
              // self.data.textContent = true;
            }
          }, ]
        });
        myPopup.then(function(res) {
        });
      };


      this.saveStache = function() {
        this.s3Upload();
        console.log('self.data: ');
        console.dir(self.data);
        stacheService.saveStache({
          title: self.data.titleText,
          content: self.data.textContent,
          tags: Object.keys(self.data.currentTags),
          lon: self.location.long,
          lat: self.location.lat,
          clue: self.data.clue
        });
      };
      this.takePicture = function() {
        cameraService.takePicture().then(function(imageData) {
          self.imageData = imageData;
        }, function(err) {
          self.imageData = err;
        });
      };

      this.captureAudio = function() {
        var options = {
          limit: 3,
          duration: 10
        };
        $cordovaCapture.captureAudio(options).then(function(audioData) {
          self.audioData = audioData;
        }, function(err) {
          self.audioData = err;
        });
      };

      this.s3Upload = function() {
        // See status of upload (% complete, public url)
        var status_elem = document.getElementById("status");
        var url_elem = document.getElementById("avatar_url");
        var preview_elem = document.getElementById("preview");
        var rString = this.randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

        var s3upload = new S3Upload({
          s3_object_name: rString,
          file_dom_selector: 'files',
          s3_sign_put_url: 'http://specter.azurewebsites.net/staches/sign_s3/',
          onProgress: function(percent, message) {
              status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
          },
          onFinishS3Put: function(public_url) {
              status_elem.innerHTML = 'Upload completed. Uploaded to: ' + public_url;
              url_elem.value = public_url;
              // Store this url in mongodb
              preview_elem.innerHTML = '<img src="' + public_url + '" style="width:100px;"/>';
          },
          onError: function(status) {
              status_elem.innerHTML = 'Upload error: ' + status;
          }
        });
      };

      this.randomString = function(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
      };

      $ionicModal.fromTemplateUrl('private-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });

      this.openPrivateModal = function() {
        if($scope.checked) {
          $scope.modal.show();
        }
      };

      this.closeModal = function() {
        $scope.modal.hide();
      };

      //call get location on click of the create button
      geoService.getLocation().then(function(position) {
        self.location.long = position.coords.longitude;
        self.location.lat = position.coords.latitude;
      }, function(err) {
        self.location = err;
      });

    };
  createCtrl.$inject = [ '$ionicActionSheet', '$ionicPopup', 'Restangular', 'cameraService',
    'stacheService', '$cordovaCapture', '$cordovaGeolocation', 'geoService', "$ionicModal",'$scope'];
  angular.module('specter.tab.create.controller', ['restangular'])
    .controller('createCtrl', createCtrl);
})();
