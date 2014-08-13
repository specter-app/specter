angular.module('specter.tab.create.controller', ['restangular'])
.controller('createCtrl', [
  '$ionicActionSheet',
  '$ionicPopup',
  'Restangular',
  'cameraService',
  'stacheService',
   '$rootScope',
   '$cordovaCapture',
   '$cordovaGeolocation',
   'geoService',
   '$cordovaCamera',
  function( $ionicActionSheet, $ionicPopup, Restangular, cameraService,
    stacheService, $rootScope, $cordovaCapture, $cordovaGeolocation, geoService, $cordovaCamera){
    var self = this;
    this.data = {
      currentTags: {}
    };
    this.location = {long: "", lat: ""};

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
            // clicked add tags button
            self.showPopup();
          } else {
            self.data.currentTags[data.text] = true;
          }
        }
      });
    };
    this.saveStache = function() {
      stacheService.saveStache({
         title: self.data.titleText,
         content: self.data.content,
         tags: Object.keys(self.data.currentTags),
         lon: self.location.long,
         lat: self.location.lat
       });
    };

    this.showPopup = function() {
      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.newTag">',
        title: 'Enter a new tag',
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

    this.takePicture = function(){
      cameraService.takePicture().then(function(imageData) {
        self.imageData = imageData;
      }, function(err) {
        self.imageData = err;
      })
    };

   this.captureAudio = function() {
     var options = { limit: 3, duration: 10 };
     $cordovaCapture.captureAudio(options).then(function(audioData) {
       self.audioData = audioData;
     }, function(err) {
       self.audioData = "ERROR";
     });
   };

  geoService.getLocation().then(function(position) {
    self.location.long = position.coords.longitude;
    self.location.lat = position.coords.latitude;
  }, function(err) {
    self.location = err;
  });
  var watch = $cordovaGeolocation.watchPosition({
    frequency: 1000
  });
  watch.promise.then(function() {
      // Not currently used
    }, function(err) {
      self.location = err
    }, function(position) {
  self.location.long = position.coords.longitude;
  self.location.lat = position.coords.latitude;
  });

}]);
