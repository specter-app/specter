(function() {
  'use strict';
  var cameraService = function($cordovaCamera) {
    this.takePicture = function(){
      $cordovaCamera.getPicture({
        cameraDirection: 2,
        quality: 90,
        allowEdit : true,
        targetWidth: 640,
        targetHeight: 640,
        correctOrientation: 1,
        saveToPhotoAlbum: true,
        encodingType: Camera.EncodingType.JPEG,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType : navigator.camera.PictureSourceType.CAMERA
      }).then(function(imageData) {
        return imageData;
      }, function(err) {
        return err;
      });
    };
  };
  angular.module('specter').service('cameraService', [
    '$cordovaCamera',
    cameraService
  ]);
})();
