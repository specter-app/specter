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
              self.showPopup();
            } else {
              self.data.currentTags[data.text] = true;
            }
          }
        });
      };
      this.showPopup = function() {
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


      this.saveStache = function() {
        stacheService.saveStache({
          title: self.data.titleText,
          content: self.data.content,
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
