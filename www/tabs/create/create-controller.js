angular.module('specter.tab.create.controller', ['restangular'])
.controller('createCtrl', [
  '$ionicActionSheet',
  '$ionicPopup',
  '$cordovaCamera',
  'Restangular',
  'stacheService',
   '$rootScope',
   '$cordovaCapture',
  function( $ionicActionSheet, $ionicPopup, $cordovaCamera,
    Restangular, stacheService, $rootScope, $cordovaCapture){
    var self = this;
    this.data = {
      currentTags: {}
    };

    // Triggered on a button click, or some other target
    this.show = function() {
      // Show the action sheet
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
            // clicked add tags button
            self.showPopup();
          } else {
            self.data.currentTags[data.text] = true;
          }
        }
      });

      // For example's sake, hide the sheet after two seconds
      // $timeout(function() {
      //   hideSheet();
      // }, 2000);

    };

    this.showPopup = function() {
      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.newTag">',
        title: 'Enter a new tag',
        // subTitle: 'Please use normal things',
        scope: self,
        buttons: [{
          text: 'Cancel'
        },
        {
          text: '<b>Save tag</b>',
          type: 'button-positive',
          onTap: function(e) {
            self.data.currentTags[self.data.newTag] = true;
            self.data.newTag = '';
          }
        }, ]
      });
      myPopup.then(function(res) {
        // console.log('Tapped!', res);
      });
    };

    this.saveStache = function() {
       var newStache = {
          title: self.data.titleText,
          author: 'bao the boss',
          lon: 40,
          lat: 5,
          content: 'this is a cool test stache',
          locked: false,
          clue:'',
          password: null,
          tags: Object.keys(self.data.currentTags)
        };
      stacheService.saveStache(newStache);
    };

     this.takePicture = function() {
      var options = {
            cameraDirection: 2,
            quality: 90, // 1-100
            allowEdit : true, // necessary for Square aspect ratio
            targetWidth: 640,
            targetHeight: 640,
            correctOrientation: 1,
            saveToPhotoAlbum: false,
            encodingType: Camera.EncodingType.JPEG,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType : navigator.camera.PictureSourceType.CAMERA
          };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        self.imageData = imageData;
      }, function(err) {
        self.imageData = "ERROR";
      });
    };

   this.captureAudio = function() {
     var options = { limit: 3, duration: 10 };
     $cordovaCapture.captureAudio(options).then(function(audioData) {
         self.audioData = audioData;
     }, function(err) {
     self.audioData = "ERROR";
    });
 }



}]);
