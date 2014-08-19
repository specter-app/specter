angular.module('specter.tab.mapview.controller', [])
.controller('mapviewCtrl', [
  'stacheService',
  'geoService',
  'location',
  '$scope',
  '$rootScope',
  '$timeout',
  '$ionicPopup',
  '$state',
  function(stacheService, geoService, location, $scope, $rootScope, $timeout, $ionicPopup, $state) {
    var self = this;
    var params = {
      lat: location.coords.latitude,
      lon: location.coords.longitude,
      dist: 1000000
    };

    stacheService.getAll(params).then(function(staches) {
      self.staches = staches;
      console.log(staches);
    });


  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
     title: 'Please log in with your Facebook',
     template: 'Go to the profile tab'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
   $timeout(function() {
     alertPopup.close();
     $state.go('tab.profile');
   }, 3000);
   };

   $rootScope.$on('$showPopup', function (event, next) {
      $scope.showAlert();
    });
}]);
