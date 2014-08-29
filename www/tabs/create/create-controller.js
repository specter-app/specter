(function(){
    var createCtrl = function($ionicActionSheet, $ionicPopup, cameraService,
      stacheService, $cordovaCapture, $ionicModal, $scope, location) {
      var self = this;
      self.data = {
        currentTags: {}
      };
      self.location = {
        long: location.coords.longitude,
        lat: location.coords.latitude
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
          // template: '<label class="item item-input"><span class="input-label">Username</span><input type="text"></label>',
          title: 'Enter text',
          scope: $scope,
          buttons: [{
            text: 'Cancel'
          }, {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {

            }
          }, ]
        });
        myPopup.then(function(res) {
        });
      };

      this.saveStache = function() {
        stacheService.saveStache({
          title: self.data.titleText,
          content: self.data.textContent,
          aws_url: self.data.aws_url,
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
        var newStache = {
          title: self.data.titleText,
          content: self.data.textContent,
          tags: Object.keys(self.data.currentTags),
          lon: self.location.long,
          lat: self.location.lat,
          clue: self.data.clue
        };

        stacheService.s3Upload(newStache);
      };

      $ionicModal.fromTemplateUrl('created-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.createdModal = modal;
      });


      this.openCreatedModal = function() {
        $scope.createdModal.show();
      };

      this.closeModal = function() {
        $scope.createdModal.hide();
      };

    };
  createCtrl.$inject = [ '$ionicActionSheet', '$ionicPopup', 'cameraService',
    'stacheService', '$cordovaCapture', '$ionicModal','$scope', 'location'];
  angular.module('specter.tab.create.controller', [])
    .controller('createCtrl', createCtrl);
})();
