(function(){
    var marcopoloCtrl = function(heatmapService, geoService, $cordovaGeolocation, $scope, location, $stateParams, stacheService, $rootScope, ionicPopup, $timeout, $ionicModal, $state) {
    var self = this;
    self.location = {
      long: location.coords.longitude,
      lat: location.coords.latitude
    };
    self.id = stacheService.selectedStache;

    stacheService.getOne(self.id).then(function(stache){
        self.currentStache = stache;
        $scope.currentStache = stache;
        self.distance = geoService.calculateDistance(self.currentStache.loc[0], self.currentStache.loc[1], self.location.long, self.location.lat);
      }, function(err){
        return err;
      });

    $scope.map = {
      center: {
          latitude: self.location.lat,
          longitude: self.location.long
      },
      zoom: 17,
      options: {mapTypeId: google.maps.MapTypeId.SATELLITE }
    };

    var gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ];

    // Create the heatmap overlay
    HeatLayer = function (heatLayer) {
      var map, pointarray, heatmap;

      // Set color of proximity indicator bar (below map)
      self.proximityColor = heatmapService.color(self.distance);

      // Add point to heatmap
      heatmapService.addPoint(self.id, self.location.lat, self.location.long, self.distance);
      // Get all data points for heatmap
      self.pointArray = heatmapService.getPoints(self.id);
      heatLayer.setData(self.pointArray);
      heatLayer.set('gradient', gradient);
      return heatLayer;
    };

    self.heatLayerCallback = function (layer) {
      self.heatLayer = new HeatLayer(layer);
      // $scope.heatLayer = new heatmapService.createHeatLayer(layer);
    };

    self.goToProfileTab = function() {
      $state.go('tab.profile.discovered');
    };

    $ionicModal.fromTemplateUrl('found-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    this.openFoundModal = function() {
      $scope.modal.show();
    };

    this.closeModal = function() {
      $scope.modal.hide();
    };

    var watch = $cordovaGeolocation.watchPosition({
      frequency: 1000
    });

    watch.promise.then(function() {
    }, function(err) {
      return err;
    }, function(position) {
        self.location.long = position.coords.longitude;
        self.location.lat = position.coords.latitude;
        if (self.currentStache){
          self.distance = geoService.calculateDistance(self.currentStache.loc[0], self.currentStache.loc[1], self.location.long, self.location.lat);
        }
        var visited = heatmapService.contains(self.id, self.location.lat, self.location.long);

        if (self.distance < 3) {
          $cordovaGeolocation.clearWatch(watch);
          self.openFoundModal();
        } else if (!visited) {
          self.proximityColor = heatmapService.color(self.distance);
          self.barStyle = {background: String(self.proximityColor)};
          heatmapService.addPoint(self.id, self.location.lat, self.location.long, self.distance);
          self.pointArray = heatmapService.getPoints(self.id);
        }
    });

    $scope.$watch('marcopolo.pointArray', function (pointArray) {
      console.log('watch on pointArray triggered');
      self.heatLayer.setData(pointArray);
    }, true);
  };

  marcopoloCtrl.$inject = ['heatmapService', 'geoService', '$cordovaGeolocation', '$scope', 'location', '$stateParams', 'stacheService', '$rootScope', '$ionicPopup', '$timeout', '$ionicModal', '$state'];
  angular.module('specter.tab.marcopolo.controller', []).controller('marcopoloCtrl', marcopoloCtrl);
})();
