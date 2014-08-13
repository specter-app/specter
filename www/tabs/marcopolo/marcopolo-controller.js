angular.module('specter.tab.marcopolo.controller', [])
  .controller('marcopoloCtrl', ['heatmapService', 'geoService', '$cordovaGeolocation', '$scope', 'location',
    function(heatmapService, geoService, $cordovaGeolocation, $scope, location) {
      var self = this;
      self.location = {long: "", lat: ""};
      self.location.long = location.coords.longitude;
      self.location.lat = location.coords.latitude;

      $scope.map = {
        center: {
            latitude: self.location.lat,
            longitude: self.location.long
        },
        zoom: 15
      };

      HeatLayer = function (heatLayer) {
          // Adding 500 Data Points
          var map, pointarray, heatmap;
          
          // localStorage.setItem(taxiData, JSON.stringify(taxiData));
          // console.dir(JSON.parse(localStorage.getItem(taxiData)));

          // var pointArray = new google.maps.MVCArray(JSON.parse(localStorage.getItem(taxiData)));
          $scope.pointArray = heatmapService.getPoints();
          console.log($scope.pointArray);
          heatLayer.setData($scope.pointArray);

      //function changeGradient() {
      //    var gradient = [
      //        'rgba(0, 255, 255, 0)',
      //        'rgba(0, 255, 255, 1)',
      //        'rgba(0, 191, 255, 1)',
      //        'rgba(0, 127, 255, 1)',
      //        'rgba(0, 63, 255, 1)',
      //        'rgba(0, 0, 255, 1)',
      //        'rgba(0, 0, 223, 1)',
      //        'rgba(0, 0, 191, 1)',
      //        'rgba(0, 0, 159, 1)',
      //        'rgba(0, 0, 127, 1)',
      //        'rgba(63, 0, 91, 1)',
      //        'rgba(127, 0, 63, 1)',
      //        'rgba(191, 0, 31, 1)',
      //        'rgba(255, 0, 0, 1)'
      //    ]
      //    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
      //}
      //
      //function changeRadius() {
      //    heatmap.set('radius', heatmap.get('radius') ? null : 20);
      //}
      //
      //function changeOpacity() {
      //    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
      //}
      };

      $scope.heatLayerCallback = function (layer) {
        //set the heat layers backend data
        var heatLayer = new HeatLayer(layer);
      };

      var watch = $cordovaGeolocation.watchPosition({
        frequency: 10000
      });
      watch.promise.then(function() {
          // Not currently used
        }, function(err) {
          self.location = err;
        }, function(position) {
      self.location.long = position.coords.longitude;
      self.location.lat = position.coords.latitude;
      self.distance = geoService.calculateDistance(-122.27013, 37.87487, self.location.long, self.location.lat)
      });

  }]);
